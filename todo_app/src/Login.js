import React, { Component } from 'react';
import $ from "jquery";

import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";
import fire from "./Firebase/fbConfig";
import { connect } from "react-redux"


function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

class Login extends Component {
    state = {
        message:null,
        open: false,
        Transition: null,
    };

    handleClick = (Transition) => {
        this.setState({ open: true, Transition });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onLogin = (e) => {
        e.preventDefault();

        let useName = $($(".LogInput")[0]).find("input").val();
        let password = $($(".LogInput")[1]).find("input").val();
        if (useName.includes("@") && useName.includes(".com") && password.length > 4) {
            $(".Progress").css("display", "block");
            fire.auth().signInWithEmailAndPassword(useName, password).then((userInfor) => {
                this.props.authAcess(true);// Give notice to other pages that you logged in
                this.props.userID(userInfor.user.uid);
                // this.props.authInfor(true);
                // Redirect
                $(".Progress").css("display", "none");
                this.props.history.push("/Dashboard");
                
            }).catch((error) => {
                this.handleClick(TransitionRight);
                this.setState({ message: "Wrong Password" });
                $($(".LogInput")[1]).find("input").val("");
                $(".Progress").css("display", "none");
            });
        }else{
            console.log("Something went wrong");
            $($(".LogInput")[1]).find("input").val("");
            this.handleClick(TransitionRight);
            this.setState({ message:"Something went wrong. Please check your Email or Password"})
        }
    }

    render() {
        return (
            <Card className="todoList">
                <LinearProgress className="Progress"/>
                <AppBar position="static" color="primary"><Toolbar><Typography variant="h6" color="inherit">Login</Typography></Toolbar></AppBar>
                <form onSubmit={this.onLogin}>
                    <TextField className="LogInput" label="Email"/>
                    <TextField className="LogInput" label="Password" type="password"/>
                    <CardActions className="LoginBTN"><Button size="large" variant="outlined" color="primary" type="submit">Login</Button></CardActions>
                </form>
                <Divider />
                <Link to="/Register"><CardActions className="RegisterBTN"><Button size="small" variant="outlined">Register</Button></CardActions></Link>
                <Snackbar open={this.state.open} 
                onClose={this.handleClose} TransitionComponent={this.state.Transition} 
                ContentProps={{ 'aria-describedby': 'message-id', }}message={<span id="message-id">{this.state.message}</span>}/>
            </Card>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authAcess: (stutas) => { dispatch({ type: 'UPDATE', data: stutas }) },
        authInfor: (data) => { dispatch({ type: 'UPDATEINFOR', data: data }) },
        userID: (data) => { dispatch({ type: 'USERID', data: data }) }
    }
}

export default connect(null,mapDispatchToProps)(Login);




