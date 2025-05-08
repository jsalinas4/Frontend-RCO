// src/app/components/servicios/servicios.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { MegaMenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, ButtonModule, DatePickerModule, FormsModule, AvatarModule, Card],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  items: MegaMenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Company',
            },
            {
                label: 'Resources'
              },
              {
                label: 'Contact'
              }

        ];
    }
  date: Date | undefined;
  servicios = [
    {
      nombre: 'Limpieza Dental',
      descripcion: 'Eliminación de placa, sarro y manchas superficiales. Recomendado cada 6 meses.',
      precio: 'S/ 100 – S/ 150',
      tipo: 'Procedimiento único, repetible cada 6 meses.'
    },
    {
      nombre: 'Blanqueamiento Dental',
      descripcion: 'Aclara el tono dental mediante técnicas profesionales (láser o gel).',
      precio: 'S/ 400 – S/ 800',
      tipo: 'Tratamiento único o de corta duración.'
    },
    {
      nombre: 'Ortodoncia',
      descripcion: 'Corrección de la posición de los dientes con brackets o alineadores.',
      precio: 'S/ 2500 – S/ 5000 (Plan completo) / Mensual: S/ 150 – S/ 300',
      tipo: 'Tratamiento continuo a largo plazo.'
    },
    {
      nombre: 'Implantes Dentales',
      descripcion: 'Sustitución de dientes mediante tornillos de titanio insertados en el hueso.',
      precio: 'S/ 2500 – S/ 4000 por implante',
      tipo: 'Tratamiento por etapas con seguimiento.'
    },
    {
      nombre: 'Tratamientos para Encías',
      descripcion: 'Tratamiento de enfermedades como gingivitis y periodontitis.',
      precio: 'Desde S/ 200 por sesión',
      tipo: 'Tratamiento continuo con controles periódicos.'
    },
    {
      nombre: 'Estética Dental',
      descripcion: 'Incluye carillas, coronas y contorneado estético.',
      precio: 'Carillas: S/ 500 – S/ 1000 / Coronas: S/ 800 – S/ 1500',
      tipo: 'Tratamiento único o por etapas.'
    }
  ];
}
