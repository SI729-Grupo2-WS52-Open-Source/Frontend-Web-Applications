import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {cart, order, product} from "../models/data-model";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  getPopularAnimeProducts() {
    return this.http.get<product[]>(`${this.baseUrl}/products?_limit=10&category=Anime`);
  }

  // Obtener productos populares de la categoría KPOP
  getPopularKpopProducts(){
    return this.http.get<product[]>(`${this.baseUrl}/products?_limit=10&category=KPOP`);
  }

  // Obtener productos populares de la categoría Lectura
  getPopularLecturaProducts(){
    return this.http.get<product[]>(`${this.baseUrl}/products?_limit=10&category=Lectura`);
  }
  addProduct(data:product){
    return this.http.post(`${this.baseUrl}/products`,data);
  }

  productList(){
    return this.http.get<product[]>(`${this.baseUrl}/products`);
  }

  deleteProduct(id: number){
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  getProduct(id: string){
      return this.http.get<product>(`${this.baseUrl}/products/${id}`);
  }

  updateProduct(product: product){
    return this.http.put<product>(`${this.baseUrl}/products/${product.id}`, product);
  }

  popularProducts(){
    return this.http.get<product[]>(`${this.baseUrl}/products?_limit=6`);
  }

  trendyProducts(){
    return this.http.get<product[]>(`${this.baseUrl}/products?_limit=6`);
  }

  searchProducts(query: string){
      return this.http.get<product[]>(`${this.baseUrl}/products?q=${query}`);
  }

  localAddToCart(data: product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    }else {
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
  removeItemFromCart(productId: number){
    let cartData = localStorage.getItem('localCart');
    if (cartData){
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId!==item.id);
        localStorage.setItem('localCart', JSON.stringify(items));
        this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart){
    return this.http.post(`${this.baseUrl}/cart`,cartData);
  }

  getCartList(userId: number){
    this.http.get<product[]>(`${this.baseUrl}/cart?userId=`+userId,
      {observe: 'response'}).subscribe((result) => {
        console.warn(result);
        if (result && result.body){
          this.cartData.emit(result.body);
        }
    })
  }

  removeToCart(cartId: number){
    return this.http.delete(`${this.baseUrl}/cart/` + cartId);
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`${this.baseUrl}/cart?userId=`+userData.id);
  }

  orderNow(data: order){
      return this.http.post(`${this.baseUrl}/orders`,data);
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`${this.baseUrl}/orders?userId=` + userData.id);

  }


  deleteCartItems(cartId: number) {
    return this.http.delete(`${this.baseUrl}/cart/` + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }
  cancelOrder(orderId: number){
    return this.http.delete(`${this.baseUrl}/orders/` + orderId);
  }


}
