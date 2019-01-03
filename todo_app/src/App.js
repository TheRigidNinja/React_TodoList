import React, { Component } from 'react';
import "./index.css"
import Todos from "./Todos"

class App extends Component {
  state = {
    todos:[
      { id: 0, content: "Horry nothing todo!" }
    ]
  }

  todolist = (e) =>{
    console.log(this.state);
    // let lists =  
    // state.id = Math.random();
    // let ninjas = [...this.state.ninjas, ninja];

    // this.setState({
    //   todos:
    // })
    // e.targer.value
  }

  render() {
    return (
      <div className="App container">
        <h1 className="jumbotron display-1 text-center">Todo's</h1>

        <Todos todos={this.state.todos} />
        <br />

        <div className="input-group mb-3 input-group-mx">
          <input type="text" placeholder="Add a Todo" className="form-control" />
          <div className="input-group-append">
            <button className="btn btn-outline-dark" onClick={this.todolist}>ADD</button>
          </div>
        </div>
        
        
      </div>
    );
  }
}

export default App;
