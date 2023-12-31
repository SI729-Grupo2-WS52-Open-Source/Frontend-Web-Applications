// update-password.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  email: string = '';
  oldPassword: string = '';
  newPassword: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {

    this.authService.updatePassword(this.email, this.oldPassword, this.newPassword).subscribe(
      response => {
        console.log('Contraseña actualizada con éxito:', response);
        // Puedes agregar lógica adicional después de la actualización exitosa si es necesario.
      },
      error => {
        console.error('Error al actualizar la contraseña:', error);
        // Puedes manejar errores aquí, como mostrar mensajes al usuario.
      }
    );
  }
}
