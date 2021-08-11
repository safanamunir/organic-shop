import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
products: {title: string}[];
filteredProducts: any[];
subscription: Subscription;

  constructor(public productService: ProductService) {
  this.subscription =  this.productService.getAll().subscribe(products => this.filteredProducts = this.products = products);
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