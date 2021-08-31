import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }

  placeOrder(order: any){
    let result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrder(){
    return this.db.list('/orders').valueChanges();
  }

  getOrderByUser(userId : string){
    return this.db.list('/orders', ref => 
     ref.orderByChild('userId').equalTo(userId)
    ).valueChanges();
  }
}
