import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  cartSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
  }
  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

  

}
