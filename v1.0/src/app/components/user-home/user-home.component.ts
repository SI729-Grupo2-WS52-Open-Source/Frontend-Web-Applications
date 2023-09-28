import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {product} from "../../models/user.model";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  editIcon = faEdit;
  constructor(private product: ProductService) {
  }
  ngOnInit(){
    this.list();
  }

  deleteProduct(id: number){
      console.warn("test id", id);
      this.product.deleteProduct(id).subscribe((result) => {
          if (result){
            this.productMessage = "Product is deleted";
            this.list();
          }
      });
      setTimeout(() => {
        this.productMessage = undefined
      }, 3000);
  }


  list(){
    this.product.productList().subscribe((result) => {
      console.warn(result);
      if (result){
        this.productList = result;
      }
    });
  }
}
