import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FluidModule } from 'primeng/fluid';
import { Router, RouterLink } from '@angular/router';
import { DatePicker } from 'primeng/datepicker';
import { formatDate, NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterUserRequestDTO } from '../../../shared/models/registerUserRequestDTO';

@Component({
  selector: 'app-register-step',
  imports: [NgIf, ButtonModule, RippleModule, InputTextModule, DatePicker, FormsModule, FluidModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  paso = 1;

  formulario: FormGroup;

  constructor(  private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.formulario = this.fb.group({
      credenciales: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmarPassword: ['', [Validators.required]],
      }, { validators: this.passwordsIguales }),

      datos: this.fb.group({
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        dni: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
      }),
    });
  }

  get credencialesForm(): FormGroup {
    return this.formulario.get('credenciales') as FormGroup;
  }

  get datosForm(): FormGroup {
    return this.formulario.get('datos') as FormGroup;
  }

  siguientePaso() {
    if (this.credencialesForm.valid) {
      this.paso = 2;
    } else {
      this.credencialesForm.markAllAsTouched();
    }
  }

  enviar() {
    if (this.datosForm.valid && this.credencialesForm.valid) {
      const cred = this.credencialesForm.value;
      const datos = this.datosForm.value;
  
      const datosParaEnviar: RegisterUserRequestDTO = {
        email: cred.email,
        password: cred.password,
        firstName: datos.nombre,
        lastName: datos.apellidos,
        dni: datos.dni,
        birthDate: formatDate(datos.fechaNacimiento, 'yyyy-MM-dd', 'en-US'),
        role: 'PATIENT', // o el que sea necesario
      };
      console.log(datosParaEnviar);
      
      this.authService.register(datosParaEnviar).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/inicio']);
        },
        error: (error) => {
          console.error('Error en el registro', error);
        }
      });
  
    } else {
      this.datosForm.markAllAsTouched();
      this.credencialesForm.markAllAsTouched();
    }
  }
  

  private passwordsIguales(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmarPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

}
