import { Link } from 'react-router-dom';

export default function TodoList (props){
    return (
        <section>
            <h1>Заметки</h1>
            <table className="table is-hoverable is-fullwidth">
                <tbody>
                    {props.list.map(item => (
                        <tr key={item.key}>
                            <td>
                                <Link to={`/${item.key}`}>
                                    {item.done && <del>{item.title}</del>}
                                    {!item.done && item.title}
                                </Link>
                            </td>                             
                            
                            <td>
                                <button type="button" 
                                        className="button is-success" 
                                        title="Пометить как сделанное" 
                                        disabled={item.done}
                                        onClick={(e) => props.setDone(item.key)}
                                >
                                    &#9745;
                                </button>
                            </td>
                            
                            <td>
                                <button type="button" 
                                        className="button is-danger" 
                                        title="Удалить"
                                        onClick={(e) => props.delete(item.key)}
                                >
                                    &#9746;
                                </button>
                            </td>
                        </tr>
                        ))}                    
                </tbody>
            </table>
        </section>
    );
}