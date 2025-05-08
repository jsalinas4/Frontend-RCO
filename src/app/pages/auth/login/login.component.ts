import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequestDTO } from '../../../shared/models/loginRequestDTO';
import { LoginResponseDTO } from '../../../shared/models/loginResponseDTO';

@Component({
  selector: 'app-login',
  imports: [CheckboxModule, InputTextModule, ButtonModule, RippleModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: LoginRequestDTO = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response: LoginResponseDTO) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          this.router.navigate(['/inicio']); // Ajusta la ruta destino
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
