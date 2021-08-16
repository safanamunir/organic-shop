import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  returnUrl: any;

  constructor(private userService: UserService,private authService: AuthService, private router: Router){
  
    authService.user$.subscribe(user =>{
      if(user){
        userService.save(user);
        this.returnUrl = localStorage.getItem('returnUrl');
        
        if(this.returnUrl){
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(this.returnUrl);
        }
      }
    })
  }
}
