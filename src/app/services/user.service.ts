import { EventEmitter, Injectable } from '@angular/core';
import { login, product, SignUp } from "../models/data-model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);
  baseURL = environment.baseURL; // Variable para la URL base

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SignUp) {
    this.http.post(`${this.baseURL}/users`, user, { observe: 'response' }).subscribe((result) => {
      if (result) {
        const createdUser = result.body;
        localStorage.setItem('user', JSON.stringify(createdUser));
        this.router.navigate(['/']);

        // Crear datos de envío para el nuevo usuario
        const shippingData = {
          address: 'Nueva dirección',
          district: 'Nuevo distrito',
          province: 'Nueva provincia',
          paymentMethod: 'Nuevo método de pago',
          linkedCard: 'Nueva tarjeta enlazada',
        };

        this.http.post(`${this.baseURL}/shipping`, shippingData).subscribe(
          (response: any) => {
            console.log('Datos de envío creados correctamente', response);
            // Puedes guardar el ID del envío si lo necesitas en la aplicación
          },
          error => {
            console.error('Error al crear los datos de envío', error);
          }
        );
      }
    });
  }

  userLogin(data: login) {
    // Agregar el encabezado 'ngrok-skip-browser-warning' con cualquier valor
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    this.http.get<SignUp[]>(`${this.baseURL}/login?email=${data.email}&password=${data.password}`,
      { headers, observe: 'response' })
      .subscribe((result) => {
        if (result && result.body?.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        } else {
          this.invalidUserAuth.emit(true);
        }
      })
  }

  userAuthReload() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.router.navigate(['/']); // Redirige al inicio si se detecta un usuario
    }
  }

  getUserProfile(payment: string) {
    return this.http.get<SignUp>(`${this.baseURL}/users/${payment}`);
  }
}
