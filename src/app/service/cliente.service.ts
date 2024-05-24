import { Injectable } from '@angular/core';
import { Cliente } from '../cliente/cliente';
import { Observable, map} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8080/api/clientes"
  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url)
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`) 
  }

  create(cliente: Cliente): Observable<Cliente> { 
    return this.http.post<Cliente>(this.url, cliente, {headers: this.headers})
  }

}
