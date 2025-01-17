import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interfaces'; //imporrte de la interfaz
import { environment } from '../../environments/environment'; //importe de la variable de entorno

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiURL; //cargue de la url de la api

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}