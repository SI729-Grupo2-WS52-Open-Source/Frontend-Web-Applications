import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { cart, order, product } from "../models/data-model";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  baseURL = environment.baseURL; // Variable para la URL base

  constructor(private http: HttpClient) {
  }

  getPopularAnimeProducts() {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<product[]>(`${this.baseURL}/products?_limit=10&category=Anime`, {headers});
  }

  getPopularKpopProducts() {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<product[]>(`${this.baseURL}/products?_limit=10&category=KPOP`, {headers});
  }

  getPopularLecturaProducts() {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<product[]>(`${this.baseURL}/products?_limit=10&category=Lectura`, {headers});
  }

  addProduct(data: product) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.post(`${this.baseURL}/products`, data, {headers});
  }

  productList() {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<product[]>(`${this.baseURL}/products`, {headers});
  }

  deleteProduct(id: number) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.delete(`${this.baseURL}/products/${id}`, {headers});
  }

  getProduct(id: string) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<product>(`${this.baseURL}/products/${id}`, {headers});
  }

  updateProduct(product: product) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.put<product>(`${this.baseURL}/products/${product.id}`, product, {headers});
  }

  popularProducts() {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<product[]>(`${this.baseURL}/products?_limit=6`, {headers});
  }

  trendyProducts() {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<product[]>(`${this.baseURL}/products?_limit=6`, {headers});
  }

  searchProducts(query: string) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.get<product[]>(`${this.baseURL}/products?q=${query}`, {headers});
  }

  localAddToCart(data: product) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
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
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.post(`${this.baseURL}/cart`, cartData, { headers });
  }

  getCartList(userId: number) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    this.http.get<product[]>(`${this.baseURL}/cart?userId=` + userId, { headers , observe: 'response'}).subscribe((result) => {
      console.warn(result);
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
  }
  removeToCart(cartId: number) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.delete(`${this.baseURL}/cart/` + cartId, { headers });
  }

  currentCart() {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`${this.baseURL}/cart?userId=` + userData.id, { headers });
  }

  orderNow(data: order) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.post(`${this.baseURL}/orders`, data, { headers });
  }

  orderList() {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`${this.baseURL}/orders?userId=` + userData.id, { headers });
  }

  deleteCartItems(cartId: number) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.delete(`${this.baseURL}/cart/` + cartId, { headers }).subscribe((result) => {
      this.cartData.emit([]);
    });
  }

  cancelOrder(orderId: number) {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    return this.http.delete(`${this.baseURL}/orders/` + orderId, { headers });
  }
}

