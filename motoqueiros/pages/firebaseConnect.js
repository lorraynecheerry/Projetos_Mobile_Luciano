import firebase from "firebase/app" 
import 'firebase/database'

//informaçao gerada atraves do site do firebase
const firebaseConfig = {
    apiKey: "AIzaSyA0Rrdy7tP9B_gKfUrMrQzlZoB5b6CwYqQ",
    authDomain: "aulasenac-6bedf.firebaseapp.com",
    databaseURL: "https://aulasenac-6bedf-default-rtdb.firebaseio.com",
    projectId: "aulasenac-6bedf",
    storageBucket: "aulasenac-6bedf.appspot.com",
    messagingSenderId: "160168792253",
    appId: "1:160168792253:web:5c62255cbce1cce6efa7d4",
    measurementId: "G-JC5V38EMD4"
  }


if(!firebase.apps.lenght){ //apps = se existe conexão
    //para abrir conexão com o firebase
    firebase.initializeApp(firebaseConfig) //firebaseConfig = nome da constante la de cima
}

export default firebase