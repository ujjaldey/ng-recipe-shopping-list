import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-recipe-shopping-list';
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      // from firebase
      apiKey: "AIzaSyBiCg7nOY2CBHzWYCKlz8kY0T_zmiFPgTs",
      authDomain: "ng-recipe-shopping-list-ud01.firebaseapp.com",
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
