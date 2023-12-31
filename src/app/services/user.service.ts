import {EventEmitter, Injectable} from '@angular/core';
import {login, LoginResponse, product, SignUp} from "../models/data-model";
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from '../../environments/environment';
import {catchError, map, Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>();
  baseURL = environment.baseURL; // Variable para la URL base

  constructor(private http: HttpClient, private router: Router) {
  }

  userSignUp(user: SignUp) {
    this.http.post(`${this.baseURL}/register`, user, {observe: 'response'}).subscribe((result) => {
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

        this.logoutAfterSignUp();

      }
    });
  }

  userLogin(data: login) {
    this.http.get<any>(`${this.baseURL}/login?email=${data.email}&password=${data.password}`, {observe: 'response'})
      .subscribe(
        (result) => {
          console.log('Inicio de sesión exitoso');

          if (result && result.body && result.body.data) {
            this.invalidUserAuth.emit(false);

            // Guardar el userId y el token en el localStorage
            localStorage.setItem('user', JSON.stringify(result.body.data));
            localStorage.setItem('userToken', result.body.data.token);
            localStorage.setItem('userId', result.body.data.userId);

            this.router.navigate(['/']);
          } else {
            console.log('No se encontraron datos en la respuesta.');
            this.invalidUserAuth.emit(true);
          }
        },
        (error) => {
          console.error('Error en la autenticación:', error);
          this.invalidUserAuth.emit(true);
        }
      );
  }


  userAuthReload() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.router.navigate(['/']); // Redirige al inicio si se detecta un usuario
    }
  }

  // Configuración del interceptor para adjuntar el token a las solicitudes
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({'Authorization': `Bearer ${token}`});
  }

  // Método para agregar el token a las solicitudes
  addTokenToRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = request.clone({
      headers: this.createAuthorizationHeader(),
    });
    return next.handle(authReq);
  }

  getUserProfile(payment: string) {
    return this.http.get<SignUp>(`${this.baseURL}/users/${payment}`);
  }

  getShippingData(userId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/shipping/${userId}`);
  }

  updateShippingData(userId: string, shippingData: any): Observable<any> {
    return this.http.put(`${this.baseURL}/shipping/${userId}`, shippingData);
  }

  updateUserData(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.baseURL}/users/${userId}`, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/users/${userId}`);
  }


  logoutAfterSignUp() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    setTimeout(() => {
      this.router.navigate(['/user-auth']);
    }, 1000);
  }


}

// Interceptor HTTP para agregar el token a las solicitudes
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.userService.addTokenToRequest(request, next);
  }
}

export class TokenResponseDto {
  token: string = '';

  constructor(token: string) {
    this.token = token;
  }
}
