import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, BehaviorSubject } from "rxjs"
import { tap } from "rxjs/operators"
import { LoginRequestDTO } from "../../shared/models/loginRequestDTO"
import { LoginResponseDTO } from "../../shared/models/loginResponseDTO"
import { RegisterUserRequestDTO } from "../../shared/models/registerUserRequestDTO"
import { RegisterUserResponseDTO } from "../../shared/models/registerUserResponseDTO"
import { ForgotPasswordDTO } from "../../shared/models/forgotPasswordDTO"
import { ChangePasswordDTO } from "../../shared/models/changePasswordDTO"
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`
  private userSubject = new BehaviorSubject<any>(null)
  public user$ = this.userSubject.asObservable()

  constructor(private http: HttpClient) {
    this.loadUserFromStorage()
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (token && user) {
      this.userSubject.next(JSON.parse(user))
    }
  }

  // Login
  login(credentials: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
        this.userSubject.next(response.user)
      }),
    )
  }

  // Registro
  register(userData: RegisterUserRequestDTO): Observable<RegisterUserResponseDTO> {
    return this.http.post<RegisterUserResponseDTO>(`${this.apiUrl}/register`, userData)
  }

  // Recuperar contraseña
  forgotPassword(email: ForgotPasswordDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, email)
  }

  // Cambiar contraseña
  changePassword(passwordData: ChangePasswordDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, passwordData)
  }

  // Logout
  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.userSubject.next(null)
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token")
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem("token")
  }
}
