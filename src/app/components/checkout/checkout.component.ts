import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { cart, order } from "../../models/data-model";
import { Router } from "@angular/router";
import { QuantityService} from "../../services/quantity.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    totalPrice: number | undefined;
    cartData: cart[] | undefined;
    orderMsg: string | undefined;

    constructor(private product: ProductService, private router: Router, private quantityService: QuantityService) {}

    ngOnInit() {
        // Suscríbete al precio total desde el servicio QuantityService
        this.quantityService.totalPrice$.subscribe((newTotalPrice) => {
            this.totalPrice = newTotalPrice;
        });
    }

    loadCartData() {
        this.product.currentCart().subscribe((result) => {
            let price = 0;
            this.cartData = result;
            result.forEach((item) => {
                if (item.quantity) {
                    price = price + (+item.price * +item.quantity);
                }
            });
            this.totalPrice = price + (price / 10) + 100 - (price / 10);
            console.warn(this.totalPrice);
        });
    }

    // Agrega un método para recalcular el totalPrice
    updateTotalPrice() {
        let price = 0;
        if (this.cartData) {
            this.cartData.forEach((item) => {
                if (item.quantity) {
                    price = price + (+item.price * item.quantity);
                }
            });
        }
        this.totalPrice = price + (price / 10) + 100 - (price / 10);
    }

    orderNow(data: { email: string, address: string, contact: string }) {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).userId;
        if (this.totalPrice) {
            let orderData: order = {
                ...data,
                totalPrice: this.totalPrice,
                userId,
                id: undefined
            }

            this.cartData?.forEach((item) => {
                setTimeout(() => {
                    item.id && this.product.deleteCartItems(item.id);
                }, 700);
            })

            this.product.orderNow(orderData).subscribe((result) => {
                if (result) {
                    this.orderMsg = "Your order has been placed";
                    setTimeout(() => {
                        this.router.navigate(['/my-orders']);
                        this.orderMsg = undefined;
                    }, 4000);
                }
            })
        }
    }
}
