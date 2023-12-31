import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {order} from "../../models/data-model";

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
  userId: string = '';
  userPayment: string = '';


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
  ) {
  }

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
      this.userId = userData.userId;
      this.userPayment = userData.payment;

      this.idShipping = this.userId;

      this.updateShippingData();
    }
  }

  updateShippingData() {
    this.idShipping = this.userId;

    if (this.idShipping) {
      this.userService.getShippingData(this.userId).subscribe(
        (response: any) => {
          if (response) {
            this.savedAddress = response.address;
            this.savedDistrict = response.district;
            this.savedProvince = response.province;
            this.savedPaymentMethod = response.paymentMethod;
            this.savedLinkedCard = response.linkedCard;
          }
        },
        error => {
          console.error('Error al obtener datos de envío', error);
        }
      );
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

    this.userService.updateShippingData(this.userId, shippingData)
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
      this.userService.deleteUser(this.userId)
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
      numberCellphone: this.userNumberCellphone,
      pay: this.userPayment,
      id: this.userId
    };

    localStorage.setItem('user', JSON.stringify(userData));

    this.userService.updateUserData(this.userId, userData)
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
    this.router.navigate(['/user-auth']);
  }

  toggleEditData() {
    this.showEditData = !this.showEditData;
  }

  updatePassword() {
    this.router.navigate(['/update-password']);
  }


}
