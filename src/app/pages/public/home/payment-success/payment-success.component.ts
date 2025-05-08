import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router, RouterLink } from "@angular/router"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { Appointment } from "../../../../shared/components/appointment-card/appointment.model"

@Component({
  selector: "app-payment-success",
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, RouterLink],
  template: `
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="bg-white rounded-xl shadow-md p-8 text-center">
        <div class="mb-6">
          <i class="pi pi-check-circle text-green-500 text-7xl"></i>
        </div>
        
        <h1 class="text-2xl font-bold mb-2">¡Pago completado con éxito!</h1>
        <p class="text-gray-600 mb-8">Tu cita ha sido confirmada y está lista para ser atendida.</p>
        
        <div *ngIf="appointmentCard" class="mb-8 max-w-md mx-auto">
          <h2 class="text-xl font-semibold mb-4">Detalles de tu cita</h2>
          
          <!-- Tarjeta de cita personalizada -->
          <div class="bg-white rounded-xl overflow-hidden shadow-md border border-sky-100">
            <div class="flex">
              <!-- Time Section -->
              <div class="bg-gradient-to-r from-sky-400 to-sky-500 text-white p-6 flex flex-col items-center justify-center">
                <div class="text-2xl font-bold">{{appointmentCard.time.split(' ')[0]}}</div>
                <div class="text-xs uppercase tracking-wide">{{appointmentCard.time.split(' ')[1]}}</div>
              </div>
              
              <!-- Details Section -->
              <div class="p-5 flex-1">
                <div class="flex flex-col gap-2">
                  <div class="flex items-center gap-2 text-gray-600">
                    <i class="pi pi-calendar text-sky-400"></i>
                    <span class="text-sm">{{appointmentCard.date}}</span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <span class="bg-sky-50 text-sky-600 text-xs font-medium px-2.5 py-1 rounded-full">
                      {{appointmentCard.service}}
                    </span>
                    <span class="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full">
                      {{appointmentCard.status}}
                    </span>
                  </div>
                  
                  <div class="font-medium">{{appointmentCard.dentist.name}}</div>
                  <div class="text-sm text-gray-500">{{appointmentCard.dentist.specialty}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-center gap-4">
          <!--
          <p-button 
            label="Ver mis citas" 
            icon="pi pi-calendar" 
            routerLink="/admin/citas" 
            styleClass="p-button-primary">
          </p-button>
-->
          <p-button 
            label="Volver al inicio" 
            icon="pi pi-home" 
            routerLink="/" 
            styleClass="p-button-secondary">
          </p-button>
        </div>
      </div>
    </div>
  `,
})
export class PaymentSuccessComponent implements OnInit {
  appointmentCard: Appointment | null = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    // Recuperar datos de la cita desde localStorage
    const pendingAppointmentStr = localStorage.getItem("pendingAppointment")
    if (pendingAppointmentStr) {
      try {
        const pendingAppointment = JSON.parse(pendingAppointmentStr)
        this.appointmentCard = pendingAppointment.appointmentCard

        // Actualizar el estado a "Confirmada"
        if (this.appointmentCard) {
          this.appointmentCard.status = "completed"
        }

        // Limpiar localStorage después de recuperar los datos
        localStorage.removeItem("pendingAppointment")
      } catch (error) {
        console.error("Error al recuperar datos de la cita:", error)
      }
    } else {
      // Si no hay datos de cita pendiente, redirigir al inicio
      this.router.navigate(["/inicio"])
    }
  }
}
