import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { ClinicalRecordDTO } from "../../shared/models/clinicalRecordDTO"
import { ClinicalRecordRequestDTO } from "../../shared/models/clinicalRecordRequestDTO"
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class ClinicalService {
  private apiUrl = `${environment.apiUrl}/api/clinical`

  constructor(private http: HttpClient) {}

  // Obtener historial clínico
  getClinicalRecord(userId: number): Observable<ClinicalRecordDTO> {
    return this.http.get<ClinicalRecordDTO>(`${this.apiUrl}/${userId}`)
  }

  // Crear historial clínico
  createClinicalRecord(clinicalData: ClinicalRecordRequestDTO): Observable<any> {
    return this.http.post(this.apiUrl, clinicalData)
  }
}
