import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  shoppingCartItemCount: number;

  constructor(public authService: AuthService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit(){
    let cart = await this.shoppingCartService.getCart();
    cart.valueChanges().subscribe(cart =>{
      this.shoppingCartItemCount = 0;
      for(let productId in cart.items){
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });

  }

  logout(){
    this.authService.logout();
  }

}
