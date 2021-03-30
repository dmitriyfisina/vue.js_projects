import firebase from "firebase/app";
import "firebase/auth";

export default function (from, to, next) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            next()
        } else {
            next('/login?loginError=true')
        }
    });
}