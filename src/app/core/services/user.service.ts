import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { UserProfileDTO } from "../../shared/models/userProfileDTO"
import { UpdateProfileDTO } from "../../shared/models/updateProfileDTO"
import { UserPaymentDTO } from "../../shared/models/userPaymentDTO"
import { UserAppointmentDTO } from "../../shared/models/userAppointmentDTO"
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api`

  constructor(private http: HttpClient) {}

  // Obtener perfil de usuario
  getUserProfile(userId: number): Observable<UserProfileDTO> {
    return this.http.get<UserProfileDTO>(`${this.apiUrl}/users/${userId}/profile`)
  }

  // Actualizar perfil de usuario
  updateUserProfile(userId: number, profileData: UpdateProfileDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/profile`, profileData)
  }

  // Obtener pagos del usuario
  getUserPayments(userId: number): Observable<UserPaymentDTO[]> {
    return this.http.get<UserPaymentDTO[]>(`${this.apiUrl}/users/${userId}/payments`)
  }

  // Obtener citas del usuario
  getUserAppointments(userId: number): Observable<UserAppointmentDTO[]> {
    return this.http.get<UserAppointmentDTO[]>(`${this.apiUrl}/users/${userId}/appointments`)
  }

  // Obtener ID del usuario desde localStorage
  getCurrentUserId(): number {
    const user = localStorage.getItem("user")
    if (user) {
      return JSON.parse(user).id
    }
    return 0
  }
}
