import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  location;
  constructor(private router: Router){

  }
  ngOnInit(): void {

    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
        // User is signed in.
        this.location=window.location.href;
        if(this.location =="https://garbh-sanskar-app.web.app/#/" || this.location =='https://garbh-sanskar-app.web.app/')
        {

this.router.navigate(['/dashboard']);
        }
      } else {
        // No user is signed in.

        this.router.navigate(['login'])
      }
    });
   
  }

  title = 'Garbh Samvad Admin Panel';
}
