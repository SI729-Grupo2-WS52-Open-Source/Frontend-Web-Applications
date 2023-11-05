import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {cart, product} from "../../models/data-model";
import {QuantityService} from "../../services/quantity.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity: number = 1;
  quantity: number = 1;

  removeCart=false;
  cartData: product | undefined;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService,   private quantityService: QuantityService) {
  }

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);

    productId && this.product.getProduct(productId).subscribe((result) => {
      console.warn(result);
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId == item.id.toString());
        this.removeCart = !!items.length;
      }

      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;

        this.quantityService.quantity$.subscribe((quantity) => {
          this.productQuantity = quantity;
        });

        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        });
      }
    });
  }


  handleQuantity(val: string) {
    if (val === 'plus' && this.productQuantity < 20) {
      this.productQuantity++;
    } else if (val === 'min' && this.productQuantity > 1) {
      this.productQuantity--;
    }

    // Actualiza la cantidad en el servicio QuantityService
    this.quantityService.updateQuantity(this.productQuantity);
  }


  AddToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result){
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  removeToCart(productId: number){
    if (!localStorage.getItem('user')){
      console.log(productId);
      this.product.removeItemFromCart(productId);

    }else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn(this.cartData);
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) => {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
      });
      this.removeCart = false;
    }
  }

}
