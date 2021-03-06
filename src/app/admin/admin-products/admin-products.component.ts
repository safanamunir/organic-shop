import { Component, OnDestroy, OnInit } from '@angular/core';
//import { DataTableResource } from 'angular-6-datatable';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
products: Product[];
filteredProducts: any[];
subscription: Subscription;
//tableResource: DataTableResource<Product>;
items: Product[] = [];
itemCount: number;

  constructor(public productService: ProductService) {
  this.subscription =  this.productService.getAll()
  .subscribe(products => {
    this.filteredProducts = this.products = products;
    });
  }

  private initializeTable(products: Product[]){

  //  this.tableResource = new DataTableResource(products);
   // this.tableResource.query({ offset: 0 })
    //  .then(items => this.items = items); 
    //this.tableResource.count()
     // .then(count => this.itemCount = count);

  }

  reloadItems(params: any) {
  //  if(!this.tableResource) return;
  //  this.tableResource.query(params).then(items => this.items = items);
}

  filter(query: string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
