import React, { Component } from "react";
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
import { NavLink} from "react-router-dom";
import fire from "./Firebase/fbConfig";



function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

class Register extends Component {
    state = {
        message: null,
        open: false,
        Transition: null,
    };

    handleClick = (Transition) => {
        this.setState({ open: true, Transition });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onRegister = (e) => {
        e.preventDefault();
        let email = $("#email").val();
        let name = $("#name").val();
        let password = $("#pass").val() === $("#repass").val() ? $("#pass").val():"error";

        if (password.length>4&&password.replace(/\s/g, "")!==""&&password!=="error"&&email.includes("@")&&email.includes(".com")&&name.replace(/\s/g, "")!== "") {
            $(".Progress").css("display", "block");
            fire.auth().createUserWithEmailAndPassword(email, password).then((userInfor) => {
                $(".Progress").css("display", "none");

                const db = fire.firestore();
                db.collection(userInfor.user.uid).doc("UserName").set({ Name: name})
                
                this.props.history.push("/");
            }).catch((error) =>{
                $(".Progress").css("display", "none");
                $("#repass").val("");
                console.log("Email already in use!");
                this.handleClick(TransitionRight);
                this.setState({ message: "Email already in use!" });
            })
        }else{
            console.log("error");
            $("#repass").val("");
            this.handleClick(TransitionRight);
            this.setState({ message: "Make sure your Email is valid. Password > 4 char in length. Password also Match on Re-Password" });
        }
    }


    render(){
        return (
            <Card className="todoList">
                <LinearProgress className="Progress" />
                <AppBar position="static" color="primary"><Toolbar><Typography variant="h6" color="inherit">Register</Typography></Toolbar></AppBar>

                <form onSubmit={this.onRegister}>
                    <TextField className="LogInput" id="email" label="Email*" />
                    <TextField className="LogInput" id="name" label="Name*"/>
                    <TextField className="LogInput" id="pass" label="Password*" type="password" />
                    <TextField className="LogInput" id="repass" label="Re-Password*" type="password" />
                    <CardActions className="LoginBTN"><Button size="large" variant="outlined" color="primary" type="submit">Register</Button></CardActions>
                </form>

                <Divider />
                <NavLink to="/"><CardActions className="RegisterBTN"><Button size="small" variant="outlined">Login</Button></CardActions></NavLink>
                <Snackbar open={this.state.open}
                    onClose={this.handleClose} TransitionComponent={this.state.Transition}
                    ContentProps={{ 'aria-describedby': 'message-id', }} message={<span id="message-id">{this.state.message}</span>} />
            </Card>
        )
    }
}

export default Register