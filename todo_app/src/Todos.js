import React from "react";

let date = new Date();
let timeofday = date.getHours();
let daystate = ["Good Morning!🤩 Its time to start adding Tasks", 
                "Good Afternoon! you have no tasks for today🤨", 
                "Evening do you! no tasks left🤗", 
                "Goodnight! sleep😴😴 early for a productive day tomorrow!",
                "You have no tasks 😁"]

switch(true){
    case timeofday >= 0 && timeofday <= 11:daystate = daystate[0];break;
    case timeofday >= 12 && timeofday <= 16:daystate = daystate[1];break;
    case timeofday >= 17 && timeofday <= 20:daystate = daystate[2];break;
    case timeofday >= 21 && timeofday <= 24: daystate = daystate[3]; break;
    default: daystate = daystate[4];
}

const Todos = ({ todos, RemoveTodo}) => {
    const todo = todos.length ?(
        todos.map(todo => {
            return(
                <li className="list-group-item remv" key={todo.id} onClick={() => { RemoveTodo(todo.id) }}>{todo.content}
                    <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                </li>
            )
        })
    ) : <li className="list-group-item text-center" key={0}>{daystate}</li>
    

    return(
        <div className="todos">
            <ul className="list-group"> 
                {todo}
            </ul>
        </div>
    );
}


export default Todos