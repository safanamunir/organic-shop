import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {

    productService.getAll()
    .pipe(switchMap(products =>{
      this.products =  products;
      return route.queryParamMap;
    }))

      .subscribe(params =>{
        this.category = params.get('category');
  
        this.filteredProducts = (this.category)?
        this.products.filter(p => p.category === this.category) :
        this.products
      });
   }

   

  ngOnInit(): void {
  }

}
