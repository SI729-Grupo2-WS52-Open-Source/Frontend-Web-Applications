import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {product} from "../../models/user.model";
@Component({
  selector: 'app-seller-update-product-content',
  templateUrl: './seller-update-product-content.component.html',
  styleUrls: ['./seller-update-product-content.component.css']
})
export class SellerUpdateProductContentComponent {
  productData: undefined | product;
  productMessage: undefined | string;
  constructor(private router: ActivatedRoute, private product: ProductService) {
  }

  ngOnInit(){
    let productId = this.router.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data;
    })
  }
  submit(data: product){
      console.warn(data);
      if (this.productData){
        data.id = this.productData.id;
      }
      this.product.updateProduct(data).subscribe((result) => {
          if(result){
            this.productMessage="Products has updated";
          }
      });
      setTimeout(() => {
        this.productMessage= undefined;
      }, 3000);
  }
}
