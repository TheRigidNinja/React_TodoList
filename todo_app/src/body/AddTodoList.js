import React, { Component } from "react";
import $ from "jquery";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import RenderTodos from "./RenderTodos";
import { connect } from "react-redux";
import fire from "../Firebase/fbConfig";


export class AddTodoList extends Component {
  state = { 
    listData:{
      "key":[],
      "timedate":[],
      "value":[]
    },
    value:"",
    date:"",
    time:""
};

  componentDidMount() {
    if (this.props.auth !== true) {
      this.props.history.push("/");
    }
  }

  onChangeDate = date => {
    this.setState({ date: $($(date.target)[0]).val()});
  };
  
  onChangeTime = time => {
   this.setState({ time: $($(time.target)[0]).val() });
  };

  hundleSubmit = () =>{
    // e.preventDefault();
    const { date, time } = this.state;
    let todoTask = $($($(".task")[0]).find("input")[0]).val();

    if ((date !== "" || time !== "") && todoTask !== "") {

      var strDate;
      if (time && date) {
        strDate = String(new Date(date + ":" + time)).substring(0, 21)
      } else if (date) {
        strDate = String(new Date(date)).substring(0, 16);
      } else {
        strDate = String(new Date("1111-11-11:" + time)).substring(16, 21);
      }

      let keyItem =  Math.random();
      let listData = {
          "key": [keyItem, ...this.state.listData.key],
          "timedate": [strDate, ...this.state.listData.timedate],
          "value": [todoTask, ...this.state.listData.value]
        };
        this.setState({ date:"",time:""});

      this.setState({listData: listData });
       $($("#time")[0]).val("");
       $($("#date")[0]).val("");
       $($($(".task")[0]).find("input")[0]).val("");
    }
  }

  RemoveTodo = (remv) =>{
    console.log(remv);
    let cnt = -1  
    let initualKey = this.state.listData.key.indexOf(remv);
    let key = this.state.listData.key.filter(filt => { return filt !== remv});
    let value = this.state.listData.value.filter(filt => { cnt++; return cnt !== initualKey }); cnt = -1;
    let timedate = this.state.listData.timedate.filter(filt => { cnt++; return cnt !== initualKey }); cnt = -1;

    this.setState({
      listData: { key: key, timedate: timedate, value: value }
    });
  }

  handleClick = () => {
    const db = fire.firestore();
    if (this.state.listData.key.length !== 0) {
      console.log(this.props.EditedTodo.Todos.Name, this.props.EditedTodo.Todos);
      if (this.props.EditedTodo.Todos.key) {
        let listData = {
          key: (this.props.EditedTodo.Todos.key).concat(this.state.listData.key),
          timedate: (this.props.EditedTodo.Todos.timedate).concat(this.state.listData.timedate),
          value: (this.props.EditedTodo.Todos.value).concat(this.state.listData.value)
        }

        this.props.Todos(listData)
        db.collection(this.props.userID).doc("listData").set(listData)
      } else {
        this.props.Todos(this.state.listData);
        db.collection(this.props.userID).doc("listData").set(this.state.listData)
      }
    } 
  }

  render() {
    const {date, time} = this.state;
    return (
         <div className="todoTab">
            <List className="todoList">
             <Link to="/Dashboard"><Button size="small" variant="outlined" className="backBTN" onClick={this.handleClick}><Icon>keyboard_backspace</Icon></Button></Link>
                <div className="inputProcess">
                    <TextField className="AddTasks task" label="Task" placeholder="I want to"/>
                    <TextField className="datetime-local" label="Time" type="time" id="time" InputLabelProps={{ shrink: true }}  defaultValue={date} onChange={this.onChangeTime}/>
                    <TextField className="datetime-local" label="Date" type="date" id="date" InputLabelProps={{ shrink: true }} defaultValue={time} onChange={this.onChangeDate}/>
                    <Button variant="contained" color="primary" className="AddTasks" onClick={this.hundleSubmit}>Add Task</Button>
                </div>

              <RenderTodos todoList = {this.state.listData} RemoveTodo={this.RemoveTodo} DoneTodo={""} Filter={"Edit"} Quote ={this.props.Quotes}/>
            </List>
            
         </div>
      )
    }
  }



const mapDispatchToProps = (dispatch) => {
  return {
    Todos: (data) => { dispatch({ type: 'ADDLIST', data: data }) }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.authAcess,
    EditedTodo: state.Todos,
    Quotes: state.Todos.Quote,
    userID: state.auth.userID
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(AddTodoList);
