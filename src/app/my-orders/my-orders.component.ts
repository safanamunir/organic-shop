import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userId: string;
  orders$: Observable<any>;

  constructor(private orderService : OrderService,
    private authService: AuthService) {

    //   this.orders$ = authService.user$
    // .pipe(switchMap(user => 
    //   orderService.getOrderByUser(user.uid)
    // ));
   }
  

  ngOnInit() {
    this.orders$ = this.authService.user$
    .pipe(switchMap(user => 
      this.orderService.getOrderByUser(user.uid)
    ));
  }

}
