import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { order } from "../../models/data-model";
import { environment } from "../../../environments/environment";

@Component({
    selector: 'app-user-detail-profile',
    templateUrl: './user-detail-profile.component.html',
    styleUrls: ['./user-detail-profile.component.css']
})
export class UserDetailProfileComponent implements OnInit {

    iconEdit = faEdit;
    showEditData: boolean = false;
    userName: string = '';
    userSurname: string = '';
    userNumberCellphone: string = '';
    userEmail: string = '';
    userPassword: string = '';
    userId: string = '';
    userPayment: string = '';

    baseURL = environment.baseURL;

    @ViewChild('addressInput') addressInput!: ElementRef;
    @ViewChild('districtInput') districtInput!: ElementRef;
    @ViewChild('provinceInput') provinceInput!: ElementRef;
    @ViewChild('paymentMethodInput') paymentMethodInput!: ElementRef;
    @ViewChild('linkedCardInput') linkedCardInput!: ElementRef;

    savedAddress: string = '';
    savedDistrict: string = '';
    savedProvince: string = '';
    savedPaymentMethod: string = '';
    savedLinkedCard: string = '';
    idShipping: string = '';

    disableInputs: boolean = true;
    editMode: boolean = false;
    disableInputsUser: boolean = true;
    editUserFields: boolean = false;

    constructor(
        private router: Router,
        private http: HttpClient,
        private product: ProductService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.getOrderList();
        this.getUserFromStorage();
    }

    getUserFromStorage() {
        const userStore = localStorage.getItem('user');
        if (userStore) {
            const userData = JSON.parse(userStore);
            this.userName = userData.name;
            this.userSurname = userData.surname;
            this.userNumberCellphone = userData.numberCellphone;
            this.userEmail = userData.email;
            this.userPassword = userData.password;
            this.userId = userData.id;
            this.userPayment = userData.payment;

            this.idShipping = this.userId;
            this.updateShippingData();
        }
    }

    updateShippingData() {
        if (this.idShipping) {
            this.http.get(`${this.baseURL}/shipping/${this.idShipping}`).subscribe((response: any) => {
                if (response) {
                    if (this.addressInput.nativeElement) {
                        this.addressInput.nativeElement.value = response.address;
                    }
                    if (this.districtInput.nativeElement) {
                        this.districtInput.nativeElement.value = response.district;
                    }
                    if (this.provinceInput.nativeElement) {
                        this.provinceInput.nativeElement.value = response.province;
                    }
                    if (this.paymentMethodInput.nativeElement) {
                        this.paymentMethodInput.nativeElement.value = response.paymentMethod;
                    }
                    if (this.linkedCardInput.nativeElement) {
                        this.linkedCardInput.nativeElement.value = response.linkedCard;
                    }
                }
            });
        } else {
            console.log('ID de envío no válido');
        }
    }

    saveShippingData() {
        this.idShipping = this.userId;

        const shippingData = {
            address: this.savedAddress,
            district: this.savedDistrict,
            province: this.savedProvince,
            paymentMethod: this.savedPaymentMethod,
            linkedCard: this.savedLinkedCard,
        };

        localStorage.setItem('shippingData', JSON.stringify(shippingData));

        this.http.put(`${this.baseURL}/shipping/${this.idShipping}`, shippingData)
            .subscribe(
                () => {
                    console.log('Datos de envío guardados correctamente');
                },
                error => {
                    console.error('Error al guardar los datos de envío', error);
                }
            );
        this.disableInputs = true;
        this.editMode = false;
    }

    edit() {
        this.editMode = true;
        this.disableInputs = false;
    }

    editUserData() {
        this.editUserFields = true;
        this.disableInputsUser = false;
    }

    validatePhoneNumber() {
        if (this.userNumberCellphone.length > 9) {
            this.userNumberCellphone = this.userNumberCellphone.slice(0, 9);
        }
    }

    deleteUserData() {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar tu cuenta?");

        if (confirmDelete) {
            this.http.delete(`${this.baseURL}/users/${this.userId}`)
                .subscribe(
                    () => {
                        this.router.navigate(['/']);
                        this.logout();
                        console.log('Datos del usuario eliminados correctamente');
                    },
                    error => {
                        console.error('Error al eliminar los datos del usuario', error);
                    }
                );
        } else {
            console.log("Cancelado por el usuario");
        }
    }

    saveUserData() {
        const userData = {
            name: this.userName,
            surname: this.userSurname,
            email: this.userEmail,
            password: this.userPassword,
            pay: this.userPayment,
            id: this.userId
        };

        localStorage.setItem('user', JSON.stringify(userData));

        this.http.put(`${this.baseURL}/users/${this.userId}`, userData)
            .subscribe(
                () => {
                    console.log('Datos del usuario actualizados correctamente');
                },
                error => {
                    console.error('Error al actualizar los datos del usuario', error);
                }
            );

        this.disableInputsUser = true;
        this.editUserFields = false;
    }

    cancelOrder(orderId: number | undefined) {
        orderId && this.product.cancelOrder(orderId).subscribe((result) => {
            if (result) {
                this.getOrderList();
            }
        });
    }

    orderData: order[] | undefined;
    getOrderList() {
        this.product.orderList().subscribe((result) => {
            this.orderData = result;
        });
    }

    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }

    toggleEditData() {
        this.showEditData = !this.showEditData;
    }

    hidePassword(password: string): string {
        return password.replace(/./g, '*');
    }
}
