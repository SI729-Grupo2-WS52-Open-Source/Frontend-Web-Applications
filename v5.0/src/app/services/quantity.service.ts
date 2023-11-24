import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {cart} from "../models/data-model";

@Injectable({
  providedIn: 'root',
})
export class QuantityService {
  private quantitySubject = new BehaviorSubject<number>(1);
  quantity$ = this.quantitySubject.asObservable();

  private totalPriceSubject = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSubject.asObservable();

  private cartData: cart[] = [];
  private cartDataSubject = new BehaviorSubject<cart[]>(this.cartData);

  constructor() {
    this.initCartData();
  }

  updateQuantity(newQuantity: number) {
    this.quantitySubject.next(newQuantity);
  }

  resetQuantity() {
    this.updateQuantity(1);
  }

  private initCartData() {
    this.cartDataSubject.subscribe((newCartData) => {
      this.cartData = newCartData;
      this.calculateTotalPrice();
    });
  }


  updateCartData(newCartData: cart[]) {
    this.cartDataSubject.next(newCartData);
  }

  private calculateTotalPrice() {
    let newTotalPrice = 0;
    for (const item of this.cartData) {
      if (item.quantity) {
        newTotalPrice += +item.price * item.quantity;
      }
    }
    this.totalPriceSubject.next(newTotalPrice);
  }
}
