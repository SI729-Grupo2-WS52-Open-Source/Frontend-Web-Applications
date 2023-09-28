import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {order} from "../../models/data-model";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orderData: order[] | undefined;
  constructor(private product: ProductService) {
  }

  ngOnInit(){
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }
}
