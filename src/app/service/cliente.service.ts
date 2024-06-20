import { Injectable, inject } from '@angular/core';
import { Cliente } from '../cliente/cliente';
import { Observable, catchError, map, tap, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private url = "http://localhost:8080/api/clientes";
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  //es importante el orden de los operadores ya que si se ejecuta uno primero que otro el primero podria afectar al otro
  // ademas se puede poner varios tap
  getClientes(page: number): Observable<any> {
    return this.http.get(this.url + '/page/' + page).pipe(
      map((response: any) => { 
        return response as Cliente[]
      }),
      catchError(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar los clientes',
          text: error.error.message,
          showConfirmButton: true
        });
        return throwError(() => error.error.message);
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
