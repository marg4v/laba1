import { Component } from "react";
import { Navigate } from "react-router-dom";

export default class TodoAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false}; //Состояние опрделеяющее, созданно дело (true) или нет (false)
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearFormData();
    }

    //Метод очищает форму после отправки данных
    clearFormData() {
        this.formData = {
            title: "",
            desc: "",
            image: ""
        };
    }

    handleTitleChange(e) {
        this.formData.title = e.target.value;
    }

    handleDescChange(e) {
        this.formData.desc = e.target.value;
    }

    handleImageChange(e) {
        const cFiles = e.target.files;
        
        if (cFiles.length > 0) {
            const fileReader = new FileReader();
            const that = this;

            fileReader.onload = () => {
                that.formData.image = fileReader.result;
            }

            fileReader.readAsDataURL(cFiles[0]);
        }
        else{
            this.formData.image = '';
        }
    }

    handleFormSubmit(e) {
        e.preventDefault(); //Отключаем обработку событий по умолчанию, чтобы не было перезагрузки страницы и потери данных, включая созданные пользователем дела
        const newDeed = { ...this.formData }; //... - это спред оператор, делает копию объекта из свойства formatData
        const date = new Date(); //Заносим в эту копию текущую дату и время
        newDeed.done = false; //Заносим пометку о том, что дело еще не выполнено
        newDeed.createdAt = date.toLocaleString();
        newDeed.key = date.getTime(); //Заносим ключ (идентификатор)
        this.props.add(newDeed); //Вызываем полученный с пропом add метод, создающий новое дело. Передаём этому методу ранее созданную копию объекта
        // this.clearFormData(); //Очищаем объект с данными формы
        // e.target.reset(); //Очищаем саму форму
        //В рез-те навигации на перечень дел, компонент TodoAdd  будет удалён, как со страницы так и из памяти, выполнять его очистку нет смысла поэтому код выше можно убрать
        this.setState((state) => ({redirect: true})); //Меняем состояние, одновременно занеся в его свойство redirect значение true
    }

    render() {
        if (this.state.redirect)
            return <Navigate to='/' />;
        else
        return (
            <section>
                <h1>Создание новой записи</h1>

                <form onSubmit={this.handleFormSubmit}>

                    <div className="field">
                        <label className="label">Заголовок</label>

                        <div className="control"> 
                            <input className="input" onChange={this.handleTitleChange} />
                        </div>
                    </div>
                    
                    <div className="field">
                        <label className="label">Примечание</label>

                        <div className="control">
                            <textarea className="textarea" onChange={this.handleDescChange} />
                        </div>
                    </div>

                    <div className="field">
                        <div className="file">
                            <label className="file-label">

                                <input className="file-input" 
                                    type="file"
                                    accept="image/*"
                                    onChange={this.handleImageChange}
                                />

                                <span className="file-cta">
                                    <span className="file-label">
                                        Добавить изображение
                                    </span>
                                </span>

                            </label>
                        </div>
                    </div>

                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input type="reset" className="button is-link is-light"
                                value="Очистить"
                            />
                        </div>

                        <div className="control">
                            <input type="submit" className="button is-primary"
                                value="Создать"
                            />
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}