import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { PaymentDetailDTO } from "../../shared/models/paymentDetailDTO"
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/api`

  constructor(private http: HttpClient) {}

  // Iniciar un pago para una cita
  createPayment(appointmentId: number): Observable<any> {
    console.log("Iniciando pago para cita ID:", appointmentId)
    return this.http.post<any>(`${this.apiUrl}/payments/create/${appointmentId}`, {})
  }

  // Obtener detalles de un pago
  getPaymentDetails(paymentId: number): Observable<PaymentDetailDTO> {
    return this.http.get<PaymentDetailDTO>(`${this.apiUrl}/payments/${paymentId}`)
  }
}
