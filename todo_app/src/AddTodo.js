import React, { Component } from "react";


class AddTodo extends Component{
    state = {
        content:""
    }

    handleChange = (e) =>{
        this.setState({
            content:e.target.value
        })
    }


    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.AddTodos(this.state)

        this.setState({
            content: ""
        })
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3 input-group-mx">
                    <input type="text" placeholder="Add a task" className="form-control" onChange={this.handleChange} value={this.state.content}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-dark">ADD</button>
                    </div>
                </div>
            </form>
        );
    }
}


export default AddTodo;