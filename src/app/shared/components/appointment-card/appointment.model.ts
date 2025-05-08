export interface Appointment {
  id: number
  time: string
  date: string
  service: string
  dentist: {
    name: string
    specialty: string
  }
  status: "active" | "completed" | "cancelled"
}
