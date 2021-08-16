import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category: any;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();

   }

  ngOnInit(): void {
  }

}
