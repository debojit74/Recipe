import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Recipe';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyA2GoaStXzW5CBQK97ApAABqXTdAMf3WDw",
      authDomain: "recipe-9ec94.firebaseapp.com"
    })
  }
}
