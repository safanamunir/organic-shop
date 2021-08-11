import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryRef: AngularFireList<any>;
  categories$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    console.log('Cat Service');
    this.categoryRef = this.db.list('/categories');
    return  this.categoryRef
    .snapshotChanges().pipe(
      map(res => res.map(c => ({
         key: c.payload.key, ...c.payload.val()
    }))

   ));

  }

}