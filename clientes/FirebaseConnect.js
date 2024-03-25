import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCE-UErEBNu-utUpftHGTR9KkK3k1nEtyg",
    authDomain: "aulasenac1.firebaseapp.com",
    databaseURL: "https://aulasenac1-default-rtdb.firebaseio.com",
    projectId: "aulasenac1",
    storageBucket: "aulasenac1.appspot.com",
    messagingSenderId: "617454454648",
    appId: "1:617454454648:web:2af4830f974e82cc872a8d",
    measurementId: "G-MVR827KHB6"
  }


if (!firebase.apps.lenght) { //apps = se existe conexão
    //para abrir conexão com o firebase
    firebase.initializeApp(firebaseConfig) //firebaseConfig = nome da constante la de cima
}

export default firebase