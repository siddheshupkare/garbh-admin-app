import { Component, OnInit } from '@angular/core';
declare var $: any;
import firebase from 'firebase';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

var firebaseConfig = {
  apiKey: "AIzaSyAhKFQlFtyGl7fahxnIAVfCZcs7wyfTAps",
  authDomain: "garbh-sanskar-app.firebaseapp.com",
  projectId: "garbh-sanskar-app",
  storageBucket: "garbh-sanskar-app.appspot.com",
  messagingSenderId: "534636719476",
  appId: "1:534636719476:web:a5e3d22f6de4afe22f1021",
  measurementId: "G-747G541XH5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

email:any;password:any;ppdisp:any =false

  constructor(private _snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
  }
  forgot(): void {

    console.log("Forgot")

    var email1 = prompt("Enter Email address to reset your password");
    console.log(email1)
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(email1).then(()=> {
      // Email sent.

      this._snackBar.open("Password Reset Link has been sent", "", {
        duration: 2000,

      }

      );
    }).then(()=>{
      this.ppdisp =false

    }).


    catch(function(error) {
      // An error happened.
    });

  }

  login():void {

    this.ppdisp =true

    console.log(this.email,this.password);

    firebase.auth().signInWithEmailAndPassword(this.email,this.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;

    console.log("user logged in")

    firebase.firestore().collection("Admin Login").where("email", "==", this.email).where("status", "==","admin")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            this.router.navigate(['app'])

        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)

    this._snackBar.open(errorMessage, "", {
      duration: 2000,
    });
  });


  }

}
