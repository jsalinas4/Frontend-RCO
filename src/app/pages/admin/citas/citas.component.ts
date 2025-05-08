import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DatePicker } from 'primeng/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { AppointmentAgendaDTO } from '../../../shared/models/appointmentAgendaDTO';
import { AppointmentService } from '../../../core/services/appointment.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-citas',
  imports: [CalendarModule, DropdownModule, FormsModule, DatePicker, CommonModule, ButtonModule, ],
  providers: [DatePipe],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {
  // Opciones para el dropdown de estado
  estadoOptions = [
    { label: "Activos", value: "activos" },
    { label: "Pasados", value: "pasados" },
  ]

  // Valores por defecto
  estadoSeleccionado = "activos"
  fechaSeleccionada: Date = new Date()
  userId = 1 // Usuario por defecto

  // Lista de citas
  citas: AppointmentAgendaDTO[] = []
  citasFiltradas: AppointmentAgendaDTO[] = []
  cargando = false
  error: string | null = null

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    // Cargar citas con valores por defecto
    this.cargarCitas()
  }

  cargarCitas(): void {
    this.cargando = true
    this.error = null

    // Formatear fecha para la API (YYYY-MM-DD)
    const fechaFormateada = this.datePipe.transform(this.fechaSeleccionada, "yyyy-MM-dd")

    if (!fechaFormateada) {
      this.error = "Error al formatear la fecha"
      this.cargando = false
      return
    }

    // Obtener citas del backend
    this.appointmentService.getAgenda(fechaFormateada, this.userId).subscribe({
      next: (data) => {
        this.citas = data
        this.filtrarCitas()
        this.cargando = false
      },
      error: (err) => {
        console.error("Error al cargar citas:", err)
        this.error = "Error al cargar las citas. Por favor, intente nuevamente."
        this.cargando = false
      },
    })
  }

  filtrarCitas(): void {
    const ahora = new Date()

    if (this.estadoSeleccionado === "activos") {
      // Filtrar citas con hora posterior a la actual
      this.citasFiltradas = this.citas.filter((cita) => {
        const fechaCita = new Date(cita.appointmentDate)
        return fechaCita > ahora
      })
    } else {
      // Filtrar citas con hora anterior a la actual
      this.citasFiltradas = this.citas.filter((cita) => {
        const fechaCita = new Date(cita.appointmentDate)
        return fechaCita <= ahora
      })
    }
  }

  onFechaChange(): void {
    this.cargarCitas()
  }

  onEstadoChange(): void {
    this.filtrarCitas()
  }

  // Métodos para formatear datos de citas
  obtenerHora(fechaCompleta: string): string {
    const fecha = new Date(fechaCompleta)
    return this.datePipe.transform(fecha, "h:mm a") || ""
  }

  obtenerFecha(fechaCompleta: string): string {
    const fecha = new Date(fechaCompleta)
    return this.datePipe.transform(fecha, "dd MMMM, yyyy") || ""
  }

  verDetalleCita(citaId: number): void {
    console.log("Ver detalle de cita:", citaId)
    // Implementar navegación al detalle de la cita
  }
}
