import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.default.User | null>;


  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ =  afAuth.authState;

   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect( new firebase.default.auth.GoogleAuthProvider());

  }

  logout(){
    this.afAuth.signOut();

  }

 // get appUser$(): Observable<AppUser>{
    // return this.user$.pipe
    // (switchMap(user => this.userService.get(user.uid))
    // )}

}


