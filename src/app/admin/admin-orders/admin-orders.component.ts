import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
orders$: Observable<any>;

  constructor( orderService: OrderService) { 
    this.orders$ = orderService.getOrder();
  }

  ngOnInit(){
  }

}
