import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [ButtonModule, CommonModule, AvatarModule, CardModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  items: MegaMenuItem[] | undefined;
  mobileMenuVisible: boolean = false;


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
}
