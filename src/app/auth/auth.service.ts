import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  token: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => this.token = token
          )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
