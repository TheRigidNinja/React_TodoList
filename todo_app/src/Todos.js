import React from "react";

const Todos = ({todos}) => {

    const todo = todos.map(todo =>{
        if (todo.id == 0 && todos.length == 1) {
            return(<li className="list-group-item text-center" key={todo.id}>{todo.content}</li>)
        } else if (todo.id !== 0) {
            return (<li className="list-group-item" key={todo.id}>{todo.content}</li>) 
        }
    })

    console.log(todo.length);
    return(
        <div className="todos">
            <ul className="list-group"> 
                {todo}
            </ul>
        </div>
    );
}


export default Todos