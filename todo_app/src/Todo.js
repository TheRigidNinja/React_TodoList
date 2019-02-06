import React, { Component } from 'react'
import "./index.css";
import Register from "./Register"
import Login from "./Login"
import Dashboard from "./Dashboard";
import AddTodoList from "./body/AddTodoList";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import fire from "./Firebase/fbConfig";
import { connect } from "react-redux";

class Todos extends Component {
    Logout = () =>{
        fire.auth().signOut();
        this.props.authAcess(false);
        window.location.reload();  
    }

    render() {
        const LogOut = () =>{
            if (this.props.Visible) {
                return <Link to="/" className="signout"><Button size="small" variant="outlined" onClick={this.Logout}>LogOut <Icon className="exitIcon">exit_to_app</Icon></Button></Link>
            }else{return null}
        }
        
      return (
        <BrowserRouter>
            <div className="container">
             <LogOut/>
              <Typography component="h2" variant="display4" gutterBottom className="Header">TODO'S</Typography>

               <Switch> 
                <Route exact path="/" component={Login} />
                <Route path="/Register" component={Register} />
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/AddTodoList" component={AddTodoList} />
                <Route path="/" component={Login} />
              </Switch>
            </div>
        </BrowserRouter>
      )
    }
}

const mapStateToProps = (state) => {
    return {
        Visible: state.auth.authAcess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authAcess: (stutas) => { dispatch({ type: 'UPDATE', data: stutas }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);


