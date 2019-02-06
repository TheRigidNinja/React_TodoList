import React, { Component } from 'react'
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import RenderTodos from "./body/RenderTodos";
import axios from "axios";
import fire from "./Firebase/fbConfig";

class Dashboard extends Component {
    state = {
        AllTodoList:null,
        EditTodoList: null,
        MonthlyTodoList: null,
        WeeklyTodoList: null,
        DailyTodoList: null,
        value: "All",
        change: "H"
    }; 

    componentDidMount(){
        if (this.props.auth === true) {
            console.log(this.props.TodoList);
            if (this.props.TodoList === 0) {
                const db = fire.firestore();
                db.collection(this.props.userID).get().then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        let items = doc.data();  
                        items = JSON.stringify(items)
                        console.log(items);
                        this.props.Profile(JSON.parse(items)); 
                    }) 
                    if (this.props.ProfileData !== undefined) {     
                        this.props.Todos(this.props.ProfileData);
                        this.setState({ AllTodoList: this.props.ProfileData, EditTodoList: this.props.ProfileData, Filter: "Home"});
                    }else{this.setState({ AllTodoList: this.props.TodoList, EditTodoList: this.props.TodoList, Filter: "Home" }); }
                    axios.get("http://quotes.stormconsultancy.co.uk/random.json").then(res => {
                        this.props.Quote({ "author": res.data.author, "quote": res.data.quote })
                    })
                })
            }else{
                this.setState({ AllTodoList: this.props.TodoList, EditTodoList: this.props.TodoList, Filter: "Home" }); 
            }
        }else{
            this.props.history.push("/");    
        }
    }

    handleChange = (event, value) => {
        if (["Done", "Failed", "Home"].includes(value) !== true) {
            this.setState({ value, Filter: value + this.state.change });

            var filtInitualKey,
            filtValue = [],
            filtTimedate = [],
            filtKey = []; 

            for (let date of this.state.AllTodoList.timedate) {
                switch (true) {
                    case ["Today"].includes(value):
                        if (String(new Date()).substring(0, 15) === date.substring(0, 15) || date.length === 5) {
                            filtInitualKey = this.state.AllTodoList.timedate.indexOf(date);
                            filtKey = [...filtKey,this.state.AllTodoList.key[filtInitualKey]];
                            filtValue = [...filtValue, this.state.AllTodoList.value[filtInitualKey]];
                            filtTimedate = [...filtTimedate, this.state.AllTodoList.timedate[filtInitualKey]];
                        }
                        break;

                    case ["Week"].includes(value):
                        if (String(new Date()).substring(4, 7) === date.substring(4, 7)) {
                            let currentDate = new Date();
                            let comparingDate = new Date(date);
                            let week = Number(String(comparingDate).substring(8, 11)) - Number(String(currentDate).substring(8, 11));
                            let getComparingDay = comparingDate.getDay() === 0 ? 7 : comparingDate.getDay();
                            let getCurrentDay = currentDate.getDay() === 0 ? 7 : currentDate.getDay();

                            if ((String(new Date()).substring(0, 15) === date.substring(0, 15) || date.length === 5) ||
                                (week >= 0 && week <= 7) && (getComparingDay >= getCurrentDay) && (getComparingDay <= 7)) {
                                filtInitualKey = this.state.AllTodoList.timedate.indexOf(date);
                                filtKey = [...filtKey, this.state.AllTodoList.key[filtInitualKey]];
                                filtValue = [...filtValue, this.state.AllTodoList.value[filtInitualKey]];
                                filtTimedate = [...filtTimedate, this.state.AllTodoList.timedate[filtInitualKey]];
                            }
                        }
                        break;

                    case ["Others"].includes(value):
                        let currentDate = new Date();
                        let comparingDate = new Date(date);
                        let week = Number(String(comparingDate).substring(8, 11)) - Number(String(currentDate).substring(8, 11));
                        let getComparingDay = comparingDate.getDay() === 0 ? 7 : comparingDate.getDay();
                        let getCurrentDay = currentDate.getDay() === 0 ? 7 : currentDate.getDay();

                        if (String(new Date()).substring(4, 7) === date.substring(4, 7) && (week >= 0 && week <= 7) && (getComparingDay >= getCurrentDay) && (getComparingDay <= 7) || 
                            (String(new Date()).substring(0, 15) === date.substring(0, 15) || date.length === 5)) {
                        }else{
                            filtInitualKey = this.state.AllTodoList.timedate.indexOf(date);
                            filtKey = [...filtKey, this.state.AllTodoList.key[filtInitualKey]];
                            filtValue = [...filtValue, this.state.AllTodoList.value[filtInitualKey]];
                            filtTimedate = [...filtTimedate, this.state.AllTodoList.timedate[filtInitualKey]];
                        }
                        break;

                    default:
                        filtInitualKey = this.state.AllTodoList.timedate.indexOf(date);
                        filtKey = [...filtKey, this.state.AllTodoList.key[filtInitualKey]];
                        filtValue = [...filtValue, this.state.AllTodoList.value[filtInitualKey]];
                        filtTimedate = [...filtTimedate, this.state.AllTodoList.timedate[filtInitualKey]];
                        break;

                }
            }
            this.setState({ EditTodoList: { key: filtKey, timedate: filtTimedate, value: filtValue } });

        } else if (value === "Done") {
            this.setState({ EditTodoList: this.props.Done, Filter: "Done", change:"D"});
            console.log("D")
        } else if (value === "Failed"){
            this.setState({ EditTodoList: this.props.Failed, Filter: "Failed", change: "F"});
            console.log("F");
        }else{
            this.setState({ EditTodoList: this.props.TodoList, Filter: "Home", change: "H"});
        }
    };

    RemoveTodo = (failed) => {
        let cnt = -1
        let initualKey = this.state.EditTodoList.key.indexOf(failed);
        let key = this.state.EditTodoList.key.filter(filt => { return filt !== failed });
        let value = this.state.EditTodoList.value.filter(filt => { cnt++; return cnt !== initualKey }); cnt = -1;
        let timedate = this.state.EditTodoList.timedate.filter(filt => { cnt++; return cnt !== initualKey }); cnt = -1;

        this.props.Todos({ key: key, timedate: timedate, value: value });
        this.props.FailedTodos({
            key: [...this.props.Failed.key, this.state.EditTodoList.key[initualKey]],
            timedate: [...this.props.Failed.timedate, this.state.EditTodoList.timedate[initualKey]],
            value: [...this.props.Failed.value, this.state.EditTodoList.value[initualKey]]
        });

        this.setState({ EditTodoList: { key: key, timedate: timedate, value: value }});

        // 
    }

    DoneTodo = (done) => {
        console.log(done);
        let cnt = -1
        let initualKey = this.state.EditTodoList.key.indexOf(done);
        let key = this.state.EditTodoList.key.filter(filt => { return filt !== done });
        let value = this.state.EditTodoList.value.filter(filt => { cnt++; return cnt !== initualKey }); cnt = -1;
        let timedate = this.state.EditTodoList.timedate.filter(filt => { cnt++; return cnt !== initualKey }); cnt = -1;

        this.props.Todos({ key: key, timedate: timedate, value: value });
        this.props.DoneTodos({
             key:[...this.props.Done.key, this.state.EditTodoList.key[initualKey]], 
             timedate: [...this.props.Done.timedate, this.state.EditTodoList.timedate[initualKey]],
             value: [...this.props.Done.value, this.state.EditTodoList.value[initualKey]]
        });
        this.setState({ EditTodoList: { key: key, timedate: timedate, value: value }});
    }

  render() {
    const { value } = this.state;

    return (
      <div className="cont">
        <BottomNavigation value={value} onChange={this.handleChange} className="Filters">
            <BottomNavigationAction label="All" value="All" icon={<Icon>view_list</Icon>} />
            <BottomNavigationAction label="Others" value="Others" icon={<Icon>calendar_today</Icon>} />
            <BottomNavigationAction label="This Week" value="Week" icon={<Icon>date_range</Icon>} />
            <BottomNavigationAction label="Today" value="Today" icon={<Icon>today</Icon>} />
        </BottomNavigation>

        <RenderTodos todoList={this.state.EditTodoList} RemoveTodo={this.RemoveTodo} DoneTodo={this.DoneTodo} Filter={this.state.Filter} Quote ={this.props.Quotes}/>

        <div className="Menu">
            <BottomNavigationAction label="Home" value="Home" onChange={this.handleChange} icon={<Icon>home</Icon>} />
            <Link to="/AddTodoList"><Fab color="primary" aria-label="Add"><AddIcon /></Fab></Link>
            <BottomNavigationAction label="Done" value="Done" onChange={this.handleChange} icon={<Icon>done_all</Icon>} />
            <BottomNavigationAction label="Failed" value="Failed" onChange={this.handleChange} icon={<Icon>timer_off</Icon>} />
            {/* check_circle */}
            {/* reply */}
            
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        Todos: (data) => { dispatch({ type: 'ADDLIST', data: data }) },
        DoneTodos: (data) => { dispatch({ type: 'DONELIST', data: data }) },
        FailedTodos: (data) => { dispatch({ type: 'FAILEDLIST', data: data }) },
        Quote: (data) => { dispatch({ type: 'QUOTE', data: data }) },
        Profile: (data) => { dispatch({ type: 'PROFILE', data: data }) }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.authAcess,
        TodoList: state.Todos.Todos,
        Done: state.Todos.DoneTodos,
        Failed: state.Todos.FailedTodos,
        Quotes: state.Todos.Quote,
        userID: state.auth.userID,
        ProfileData: state.auth.Profile,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
