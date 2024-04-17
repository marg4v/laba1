import { Component } from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import TodoList from "./components/TodoList.js";
import TodoAdd from "./components/TodoAdd.js"; 
import TodoDetail from "./components/TodoDetail.js";
import 'normalize.css';
import './css/index.css';

const firstDate = new Date(2021, 7, 19, 14, 5);
const secondDate = new Date();

const initialData = [
  {
    title: 'Изучить React',
    desc: 'Да поскорее!',
    image: '',
    done: true,
    createAt: firstDate.toLocaleString(),
    key: firstDate.getTime()
  },

  {
    title: 'Написать первое React-приложение',
    desc: 'Список запланированных дел',
    image: '',
    done: false,
    createAt: secondDate.toLocaleString(),
    key: secondDate.getTime()
  }
];

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = { data: initialData, showMenu: false };
    this.setDone = this.setDone.bind(this); //bind - привязывает функцию к контексту (либо делаем через замыкание, чтобы он не терялся)
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.getDeed = this.getDeed.bind(this);
  }

  setDone(key){
    const deed = this.state.data.find((current) => current.key === key);
    if (deed){
      deed.done = true;
      this.setState((state) => ({}));
    }

  }

  delete(key){
    const newData = this.state.data.filter((current) => current.key !== key);
    this.setState((state) => ({ data: newData }));
  }

  add(deed){
    this.state.data.push(deed);
    this.setState((state) => ({}));
  }

  showMenu(e){
    e.preventDefault();
    this.setState((state) => ({ showMenu: !state.showMenu }));
  }

  getDeed(key){ //Поиск в массиве дела с указанным id, и передача этого метода компоненту TodoDetail с пропом getDeed 
    key = +key;
    return this.state.data.find((current) => current.key === key);
  }

  render(){
    return(
      <HashRouter>

        <nav className="navbar is-light">

          <div className="navbar-brand">
            {/* NavLink, в отличие от Link, умеет проверять, является она активной или нет */}
            <NavLink  to="/"
                      className={ ({ isActive }) => 
                        'navbar-item is-uppercase' + 
                        (isActive ? ' is-active' : '')
                      }
            >
              Todos
            </NavLink>
            <button
                className={this.state.showMenu ? 'navbar-burger is-active' : 'navbar-burger'}
                onClick={this.showMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
          </div>

          <div className={ this.state.showMenu ? 
                          'navbar-menu is-active' :
                          'navbar-menu' }
                          onClick={this.showMenu}
          >
            <div className="navbar-start">
              {/* NavLink, в отличие от Link, умеет проверять, является она активной или нет */}
              <NavLink  to="/add"
                        className={ ({ isActive }) => 
                          'navbar-item' + 
                          (isActive ? ' is-active' : '')
                        }
              >
                Создать запись
              </NavLink>

            </div>

          </div>
        </nav>

        <main className="content px-6 mt-6">

          <Routes> {/*Коммутатор */}
            {/* Маршрут 1: path - путь маршрута, element - целевой компонент */}
            <Route path="/" element={
              <TodoList list={this.state.data} 
                    setDone={this.setDone}
                    delete={this.delete}
              />}
            />

            {/* Маршрут 2 */}
            <Route path="/add" element={
              <TodoAdd add={this.add} />} 
            />

            <Route path="/:key" element={
              <TodoDetail getDeed={this.getDeed} />}
            />

            {/* </Route> */}
          </Routes>
        
        </main>

      </HashRouter>
    );
  }
}