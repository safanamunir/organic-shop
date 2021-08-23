import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
import {  take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  data: any;

  constructor(private db: AngularFireDatabase) { }

  create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

   async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
    .pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId + '/');
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    console.log('result key',result.key);
    return result.key;
    
  }


  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) =>{  

    if(item.key === null){
     item$.set({
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1});
     console.log('adding new product to cart');        
    }
     else {
       let quantity = (item.payload.val().quantity || 0) + 1;
       if(quantity === 0) item$.remove();
       else
        item$.update({ quantity: quantity });
      }
    });
  }
  async removeFromCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) =>{  

      let quantity = (item.payload.val().quantity || 0) - 1 ;
      if(quantity === 0) item$.remove();
      else
      item$.update({ quantity: quantity });
      
    });

  }

  
}
