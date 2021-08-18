import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  categoryRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
   return this.db.list('/products').push(product);
  }

  getAll(){
    console.log('Product Service');
    this.categoryRef = this.db.list('/products');
    return this.categoryRef
     .snapshotChanges().pipe(
       map(res => res.map(c => ({
          key: c.payload.key, ...c.payload.val()
     }))

     ));

   }

    getProduct(productId: any){
     return  this.db.object('/products/' + productId);
    }

    update(productId: any, product: any){
      return this.db.object('/products/' + productId).update(product);
    }

    delete(productId : any){
      return this.db.object('/products/' + productId).remove();
    }
}
