import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {product} from "../../models/data-model";

@Component({
  selector: 'app-admin-update-product',
  templateUrl: './admin-update-product.component.html',
  styleUrls: ['./admin-update-product.component.css']
})
export class AdminUpdateProductComponent {

  productData: undefined | product;
  productMessage: undefined | string;
  constructor(private router: ActivatedRoute, private product: ProductService) {
  }

  ngOnInit(): void{
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
      if (result){
        this.productMessage = "Product has updated";
      }
    });
    setTimeout(() => {
        this.productMessage = undefined;
    }, 3000)
  }
}
