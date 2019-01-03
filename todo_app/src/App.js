import React, { Component } from 'react';
import "./index.css"
import Todos from "./Todos"
import AddTodo from "./AddTodo";

class App extends Component {
  state = {
    todos:[
    ]
  }

  AddTodos = (newTask) =>{
    if (newTask.content.replace(/ /g, '') !== "") {
      let newTodo = { id: Math.random(), content: newTask.content };
      let todo = [...this.state.todos, newTodo];
      this.setState({
        todos: todo
      })
    }
  }
  
  RemoveTodo = (remv) => {
    const todos = this.state.todos.filter(todo =>{
      return todo.id !== remv;
    })

    this.setState({
      todos: todos
    })
  }


  render() {
    return (
      <div className="App container">
        <h1 className="jumbotron display-1 text-center">Todo's</h1>

        <Todos todos={this.state.todos} RemoveTodo={this.RemoveTodo}/>
        <br />
        <AddTodo AddTodos={this.AddTodos}/>
      </div>
    );
  }
}

export default App;
