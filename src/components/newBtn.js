import { useState } from "react";

export default function NewBtn(props) {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    }    

    return (
        <>
            <button type="button" className="button is-success" onMouseOver={handleClick}> You clicked button {count} times</button>
        </>
    )
}