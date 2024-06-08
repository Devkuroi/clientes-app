import { Injectable, inject } from '@angular/core';
import { formatDate, registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-CO';
import { Cliente } from '../cliente/cliente';
import { Observable, catchError, map, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private url = "http://localhost:8080/api/clientes"
  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url).pipe(
      map( response => {
        let clientes = response as Cliente[]
        return clientes.map(cliente => {
          registerLocaleData(localeES, 'es');
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.createAt = formatDate(cliente.createAt! ,'fullDate', 'es')
          return cliente
        })
      })
    )
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError(error => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          icon: 'error',
          title: 'Error al editar',
          text: error.error.message,
          showConfirmButton: true
        });
        return throwError(() => error.error.message);
      })
    )
  }

  create(cliente: Cliente): Observable<Cliente> { 
    return this.http.post<Cliente>(this.url, cliente, {headers: this.headers}).pipe(
      catchError(error => {
        if(error.status == 400) {
          return throwError(() => error.error);
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el cliente',
          text: error.error.message,
          showConfirmButton: true
        });
        return throwError(() => error.error)
      })
    )
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente, {headers: this.headers}).pipe(
      catchError(error => {

        if(error.status == 400) {
          return throwError(() => error.error);
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al editar el cliente',
          text: error.error.message,
          showConfirmButton: true
        });
        return throwError(() => error.error)
      })
    )
  }

  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: this.headers}).pipe(
      catchError(error => {
        console.error(error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar el cliente',
          text: error.error.message,
          showConfirmButton: true
        });
        return throwError(() => error.error.message)
      })
    )
  }
}
