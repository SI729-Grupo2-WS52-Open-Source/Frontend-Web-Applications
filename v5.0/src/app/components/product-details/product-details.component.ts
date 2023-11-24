
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { cart, product } from '../../models/data-model';
import { QuantityService } from '../../services/quantity.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: product | undefined;
  productQuantity: number = 1;
  quantity: number = 1;

  removeCart = false;
  cartData: product | undefined;

  constructor(
      private activeRoute: ActivatedRoute,
      private productService: ProductService,
      private quantityService: QuantityService
  ) {}

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);

    // Obtén el userId de localStorage y conviértelo a número
    let user = localStorage.getItem('user');
    let userId =  user && JSON.parse(user).userId;

    productId &&
    this.productService.getProduct(productId).subscribe((result) => {
      console.warn(result);
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items: product[] = JSON.parse(cartData);
        items = items.filter((item: product) => productId == item.id.toString());
        this.removeCart = !!items.length;
      }


      if (user && userId !== undefined) {
        this.quantityService.quantity$.subscribe((quantity) => {
          this.productQuantity = quantity;
        });

        // Verifica si userId es un número válido antes de realizar la solicitud
        if (!isNaN(userId)) {
          this.productService.getCartList(userId);
          this.productService.cartData.subscribe((result) => {
            let item = result.filter(
                (item: product) =>
                    productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        } else {
          console.error('userId no es un número válido.');
        }
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

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).userId;
        if (userId) {
          let cartData: cart = {
            ...this.productData,
            userId,
            productId: this.productData.id,
          };

          delete cartData.id;

          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              this.productService.getCartList(userId);
              this.removeCart = true;
            }
          });
        }
      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);
    } else {
      console.warn(this.cartData);
      this.cartData &&
      this.productService.removeToCart(this.cartData.id).subscribe((result) => {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).userId;
        this.productService.getCartList(userId);
      });
      this.removeCart = false;
    }
  }
}
