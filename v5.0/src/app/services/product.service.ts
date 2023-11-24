import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { cart, order, product } from "../models/data-model";
import { environment } from '../../environments/environment';
import {Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  baseURL = environment.baseURL; // Variable para la URL base

  constructor(private http: HttpClient) {
  }

  getPopularAnimeProducts() {
    return this.http.get<product[]>(`${this.baseURL}/products/popular/anime`);
  }

  getPopularKpopProducts() {
    return this.http.get<product[]>(`${this.baseURL}/products/popular/kpop`);
  }

  getPopularLecturaProducts() {
    return this.http.get<product[]>(`${this.baseURL}/products/popular/lectura`);
  }

  addProduct(data: product) {
    return this.http.post(`${this.baseURL}/products`, data);
  }

  productList() {
    return this.http.get<product[]>(`${this.baseURL}/products`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseURL}/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`${this.baseURL}/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(`${this.baseURL}/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<product[]>(`${this.baseURL}/products/popular`);
  }

  trendyProducts() {
    return this.http.get<product[]>(`${this.baseURL}/products/popular`);
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`${this.baseURL}/products/search?query=${query}`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    const localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    const cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post(`${this.baseURL}/cart`, cartData);
  }

  getCartList(userId: number) {
    const url = `${this.baseURL}/cart?userId=${userId}`;
    this.http.get<product[]>(url).subscribe(
        (result) => {
          if (result && Array.isArray(result)) {
            this.cartData.emit(result);
          }
        },
        (error) => {
          console.error('Error fetching cart data:', error);
          // Aquí puedes manejar el error, emitir eventos o tomar acciones según lo necesario
        }
    );
  }
  removeToCart(cartId: number) {
    return this.http.delete(`${this.baseURL}/cart/` + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userId = userStore && JSON.parse(userStore).userId;

    return this.http.get<cart[]>(`${this.baseURL}/cart?userId=` + userId);
  }

  orderNow(data: order) {
    return this.http.post(`${this.baseURL}/orders`, data);
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore).userId;
    return this.http.get<order[]>(`${this.baseURL}/orders?userId=` + userData);

  }

  deleteCartItems(cartId: number) {
    return this.http.delete(`${this.baseURL}/cart/` + cartId ).subscribe((result) => {
      this.cartData.emit([]);
    });
  }

  cancelOrder(orderId: number) {
    return this.http.delete(`${this.baseURL}/orders/` + orderId);
  }


}

