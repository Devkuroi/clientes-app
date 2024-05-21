import { Injectable } from '@angular/core';
import { Cliente } from '../cliente/cliente';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8080/api/clientes"

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.url).pipe(
      map(response => response as Cliente[])
    )
  }
}
