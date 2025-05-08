import { Component, Input } from "@angular/core"
import type { Appointment } from "./appointment.model"
import { NgClass } from "@angular/common"
import { ButtonModule } from "primeng/button"

@Component({
  selector: "app-appointment-card",
  imports: [NgClass, ButtonModule],
  templateUrl: "./appointment-card.component.html",
})
export class AppointmentCardComponent {
  @Input() appointment!: Appointment

  getStatusClass(): string {
    switch (this.appointment.status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return ""
    }
  }

  getStatusLabel(): string {
    switch (this.appointment.status) {
      case "active":
        return "Activa"
      case "completed":
        return "Completada"
      case "cancelled":
        return "Cancelada"
      default:
        return ""
    }
  }
}
