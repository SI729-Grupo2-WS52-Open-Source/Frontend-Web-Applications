import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {product} from "../../models/user.model";

@Component({
  selector: 'app-products-content',
  templateUrl: './products-content.component.html',
  styleUrls: ['./products-content.component.css']
})
export class ProductsContentComponent {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) {
  }
  submit(data: product){
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if(result){
        this.addProductMessage="Product is successfully added";
      }
      setTimeout(() => this.addProductMessage = undefined, 3000);
    });
  }
}
