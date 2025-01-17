import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from './services/user.service';
import { User } from '../app/interfaces/user.interfaces';

@Component({
  selector: 'app-root', // selector
  standalone: true,
  imports: [ // importaciones
    CommonModule // importar el modulo comun para el uso de *ngFor en el html
  ],
  templateUrl: './app.component.html', // plantilla
  styleUrls: ['./app.component.css'] // estilos de la plantilla
})
export class AppComponent implements OnInit {
  users: User[] = []; // lista de usuarios

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // datos recibidos
        this.users = data;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error); // error al cargar usuarios
      }
    });
  }
}