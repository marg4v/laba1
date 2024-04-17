import {useParams} from 'react-router-dom';

export default function TodoDetail(props){
    const { key } = useParams(); //Поиск id записи по ключу (Вернёт просто объект, свойства из которого соотв-ют всем полученным URL-параметрам)
    const deed = props.getDeed(key); //Получив id, извлекаем соотв-ющую запись из массива дел

    return (
        <section>
            {
                deed.done ? <p className='has-text-success'>Выполнено</p> : <p className='has-text-danger'>Не выполнено</p>
            }

            <h1>{deed.title}</h1>

            <p>{deed.createdAt}</p>

            { deed.desc && <p>{deed.desc}</p> }

            { deed.image && <picture>
                                <img src={deed.image} alt='Иллюстрация' />
                            </picture> 
            }
        </section>
    )
}