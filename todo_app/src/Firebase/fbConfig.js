import firebase from "firebase";
var config = {
    apiKey: "AIzaSyAYSz-_R1oE0VYHkablIzhqH00sEfId-7E",
    authDomain: "therigidninja.firebaseapp.com",
    databaseURL: "https://therigidninja.firebaseio.com",
    projectId: "therigidninja",
    storageBucket: "therigidninja.appspot.com",
    messagingSenderId: "293845030774"
};

const fire = firebase.initializeApp(config);

export default fire; 