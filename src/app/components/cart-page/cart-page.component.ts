import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { cart, priceSummary } from "../../models/data-model";
import { Router } from "@angular/router";
import { QuantityService} from "../../services/quantity.service";

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
    cartData: cart[] | undefined;
    priceSummary: priceSummary = {
        price: 0,
        discount: 0,
        tax: 0,
        delivery: 0,
        total: 0
    };
    quantity: number = 1;
    totalPrice: number = 0;

    constructor(
        private product: ProductService,
        private router: Router,
        private quantityService: QuantityService
    ) {}

    ngOnInit() {
        this.loadDetails();
        this.quantityService.quantity$.subscribe((newQuantity) => {
            this.quantity = newQuantity;
        });

        this.quantityService.totalPrice$.subscribe((newTotalPrice) => {
            this.totalPrice = newTotalPrice;
        });
    }

    removeToCart(cartId: number | undefined) {
        console.log('El ID del carrito es:', cartId);
        if (cartId !== undefined) {
            this.product.removeToCart(cartId).subscribe((result) => {
                this.loadDetails();
            });
        } else {
            console.error('El ID del carrito es undefined. No se puede eliminar.');
        }
    }



    loadDetails() {
        this.product.currentCart().subscribe((result) => {
            this.cartData = result;
            this.updatePriceSummary();
            if (!this.cartData.length) {
                this.router.navigate(['/']);
            }
            this.quantityService.updateCartData(this.cartData);
        });
    }

    handleQuantity(action: string, product: cart, newValue?: number) {
        if (action === 'min' && product.quantity !== undefined && product.quantity > 1) {
            product.quantity--;
        } else if (action === 'plus' && product.quantity !== undefined && product.quantity < 20) {
            product.quantity++;
        } else if (action === 'input' && newValue !== undefined) {
            product.quantity = newValue;
        }

        this.updatePriceSummary();

        if (this.cartData) {
            this.quantityService.updateCartData(this.cartData);
        }
    }

    updatePriceSummary() {
        if (this.cartData && this.cartData.length > 0) {
            let price = 0;
            this.cartData.forEach((item: cart) => {
                if (item.quantity) {
                    price += +item.price * item.quantity;
                }
            });
            this.priceSummary.price = price;
            this.priceSummary.discount = price / 10;
            this.priceSummary.tax = price / 10;
            this.priceSummary.delivery = 100;
            this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
        }
    }

    resetQuantity() {
        this.quantityService.resetQuantity();
    }

    checkout() {
        this.resetQuantity();
        this.router.navigate(['/checkout']);
    }

}
