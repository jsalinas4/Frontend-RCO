import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import  { Observable } from "rxjs"
import { TimeSlotDTO } from "../../shared/models/timeSlotDTO"
import { AppointmentRequestDTO } from "../../shared/models/appointmentRequestDTO"
import { AppointmentResponseDTO } from "../../shared/models/appointmentResponseDTO"
import { AppointmentAgendaDTO } from "../../shared/models/appointmentAgendaDTO"
import { RescheduleAppointmentDTO } from "../../shared/models/rescheduleAppointmentDTO"
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/api`

  constructor(private http: HttpClient) {}

  // Obtener slots disponibles
  getAvailableSlots(dentistId: number, fecha: string): Observable<TimeSlotDTO[]> {
    return this.http.get<TimeSlotDTO[]>(
      `${this.apiUrl}/appointments/available-slots?dentistId=${dentistId}&fecha=${fecha}`,
    )
  }

  // Crear una cita
  createAppointment(appointment: AppointmentRequestDTO): Observable<AppointmentResponseDTO> {
    console.log("Enviando solicitud de cita:", appointment)
    return this.http.post<AppointmentResponseDTO>(`${this.apiUrl}/appointments`, appointment)
  }

  // Obtener agenda de citas
  getAgenda(date: string, userId: number): Observable<AppointmentAgendaDTO[]> {
    return this.http.get<AppointmentAgendaDTO[]>(`${this.apiUrl}/appointments?date=${date}&user_id=${userId}`)
  }

  // Reprogramar una cita
  rescheduleAppointment(appointmentId: number, rescheduleData: RescheduleAppointmentDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/appointments/${appointmentId}/reschedule`, rescheduleData)
  }
}
