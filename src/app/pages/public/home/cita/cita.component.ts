import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import {StepperModule} from 'primeng/stepper';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { Calendar } from 'primeng/calendar';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AppointmentRequestDTO } from '../../../../shared/models/appointmentRequestDTO';
import { TimeSlotDTO } from '../../../../shared/models/timeSlotDTO';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { PaymentService } from '../../../../core/services/payment.service';
import { UserService } from '../../../../core/services/user.service';
import { Appointment } from '../../../../shared/components/appointment-card/appointment.model';
import { AppointmentCardComponent } from '../../../../shared/components/appointment-card/appointment-card.component';

interface Service {
  id: number
  name: string
  cost: number
}

interface TimeSlot {
  hora: string
  disponible: boolean
}

interface Servicio {
  id: number
  nombre: string
  costo: string
  icono: string
}

interface AppointmentRequest {
  appointmentDate: string
  serviceId: number
  reason: string
  patientId: number
  dentistId: number
}

interface Servicio {
  id: number
  nombre: string
  costo: string
  icono: string
}

@Component({
  selector: 'app-cita',
  imports: [StepperModule, Card, Button, StepperModule, FormsModule, NgFor, StepperModule, StepsModule,
    RadioButtonModule, NgIf, DatePickerModule, Calendar, StepsModule, DatePipe, NgClass, RouterLink, 
    AppointmentCardComponent
  ],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'
})
export class CitaComponent implements OnInit {
  minDate: Date = new Date();
  // Datos del stepper
  activeIndex = 0

  // Datos de servicios
  selectedServicio: Servicio | null = null
  servicios: Servicio[] = [
    { id: 1, nombre: "Consulta", costo: "100", icono: "tooth"},
    { id: 2, nombre: "Limpieza Dental", costo: "100", icono: "tooth" },
    { id: 3, nombre: "Blanqueamiento Dental", costo: "150", icono: "tooth" },
    { id: 4, nombre: "Ortodoncia", costo: "300", icono: "tooth" },
    { id: 5, nombre: "Implantes Dentales", costo: "1500", icono: "tooth" },
    { id: 6, nombre: "Tratamientos para Encías", costo: "200", icono: "tooth" },
    { id: 7, nombre: "Estética Dental", costo: "500", icono: "tooth" },
  ]

  // Datos de fecha y hora
  selectedDate: Date | null = null
  selectedHorario: TimeSlotDTO | null = null
  timeSlots: TimeSlotDTO[] = []

  // Datos de la cita creada
  createdAppointment: Appointment | null = null
  createdAppointmentId: number | null = null
  paymentUrl: string | null = null
  isLoading = false

  constructor(
    private appointmentService: AppointmentService,
    private paymentService: PaymentService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Verificar si hay un ID de usuario en localStorage
    const userId = this.userService.getCurrentUserId()
    if (!userId) {
      this.router.navigate(["/login"])
    }
  }

  // Método para cargar los slots disponibles cuando se selecciona una fecha
  loadAvailableSlots() {
    if (!this.selectedDate) return

    // Formatear la fecha para la API (YYYY-MM-DD)
    const formattedDate = this.formatDate(this.selectedDate)
    const dentistId = 1 // ID del dentista (podría venir de un servicio)

    this.isLoading = true
    this.appointmentService.getAvailableSlots(dentistId, formattedDate).subscribe({
      next: (slots) => {
        this.timeSlots = slots
        this.isLoading = false
        console.log("Slots disponibles cargados:", slots)
      },
      error: (error) => {
        console.error("Error al cargar slots disponibles:", error)
        // En caso de error, mostrar datos de ejemplo
        this.loadMockTimeSlots()
        this.isLoading = false
      },
    })
  }

  // Método para cargar datos de ejemplo (solo para desarrollo)
  loadMockTimeSlots() {
    this.timeSlots = [
      { hora: "9:00 am - 10:00 am", disponible: true },
      { hora: "10:00 am - 11:00 am", disponible: false },
      { hora: "11:00 am - 12:00 pm", disponible: true },
      { hora: "1:00 pm - 2:00 pm", disponible: true },
      { hora: "2:00 pm - 3:00 pm", disponible: false },
      { hora: "3:00 pm - 4:00 pm", disponible: true },
      { hora: "4:00 pm - 5:00 pm", disponible: false },
    ]
  }

  // Método para formatear la fecha (YYYY-MM-DD)
  formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Método para avanzar al siguiente paso
  onNextStep(nextIndex: number) {
    if (nextIndex === 2) {
      // Crear la cita cuando avanzamos al paso de redirección
      this.createAppointment()
    }
  }

  // Método para crear la cita
  createAppointment() {
    if (!this.selectedServicio || !this.selectedDate || !this.selectedHorario) {
      console.error("Faltan datos para crear la cita")
      return
    }

    // Obtener el ID del usuario desde localStorage
    const userId = this.userService.getCurrentUserId()
    if (!userId) {
      console.error("No se encontró ID de usuario")
      return
    }

    // Extraer la hora del formato "9:00 am - 10:00 am"
    const hourPart = this.selectedHorario.hora.split(" - ")[0]

    // Crear una nueva fecha con la fecha seleccionada y la hora extraída
    const appointmentDate = new Date(this.selectedDate)
    const [hourStr, minuteStr, period] = hourPart.split(/[:\s]/)
    let hour = Number.parseInt(hourStr)
    const minute = Number.parseInt(minuteStr)

    // Convertir a formato 24 horas si es PM
    if (period && period.toLowerCase() === "pm" && hour < 12) {
      hour += 12
    }
    // Si es 12 AM, convertir a 0
    if (period && period.toLowerCase() === "am" && hour === 12) {
      hour = 0
    }

    appointmentDate.setHours(hour, minute, 0)

    // Crear el objeto de solicitud de cita
    const appointmentRequest: AppointmentRequestDTO = {
      appointmentDate: appointmentDate.toISOString(),
      serviceId: this.selectedServicio.id,
      reason: `Cita para ${this.selectedServicio.nombre}`,
      patientId: userId,
      dentistId: 1, // ID del dentista (podría venir de un servicio)
    }

    console.log("Enviando solicitud de cita:", appointmentRequest)

    this.isLoading = true
    this.appointmentService.createAppointment(appointmentRequest).subscribe({
      next: (response) => {
        console.log("Cita creada exitosamente:", response)
        this.createdAppointmentId = response.appointmentId ?? 0; // Si es undefined, asigna 0


        // Crear la tarjeta de cita para mostrar
        this.createdAppointment = {
          id: response.appointmentId,
          date: this.formatDate(this.selectedDate!),
          time: this.selectedHorario!.hora,
          service: this.selectedServicio!.nombre,
          status: "completed",
          dentist: {
            name: "Dr. Manuel Rodríguez",
            specialty: this.selectedServicio!.nombre,
          },
        }

        // Iniciar el proceso de pago
        this.createPayment(response.appointmentId)
      },
      error: (error) => {
        console.error("Error al crear la cita:", error)
        this.isLoading = false
        alert("Error al crear la cita. Por favor, intente nuevamente.")
      },
    })
  }

  // Método para crear el pago
  createPayment(appointmentId: number) {
    console.log("Iniciando pago para cita ID:", appointmentId)

    this.paymentService.createPayment(appointmentId).subscribe({
      next: (response) => {
        console.log("Respuesta de creación de pago:", response)

        // Extraer la URL de pago de la respuesta
        if (response && response.init_point) {
          this.paymentUrl = response.init_point

          // Guardar datos en localStorage para recuperarlos después del pago
          localStorage.setItem(
            "pendingAppointment",
            JSON.stringify({
              appointmentId: appointmentId,
              appointmentCard: this.createdAppointment,
            }),
          )

          // Redirigir a la URL de pago después de un breve retraso
          setTimeout(() => {
            window.location.href = this.paymentUrl!
          }, 3000)
        } else {
          console.error("No se recibió URL de pago válida")
          this.isLoading = false
        }
      },
      error: (error) => {
        console.error("Error al crear el pago:", error)
        this.isLoading = false
        alert("Error al procesar el pago. Por favor, intente nuevamente.")
      },
    })
  }

  // Método para simular la redirección y mostrar la información
  triggerRedirect(callback: any): boolean {
    // Este método se llama desde la plantilla
    // No necesitamos hacer nada aquí ya que la redirección real
    // se maneja en createPayment()
    return true
  }
  
}
