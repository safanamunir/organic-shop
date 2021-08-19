import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(public authService: AuthService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
    
  }

  logout(){
    this.authService.logout();
  }

}
