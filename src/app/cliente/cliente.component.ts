import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../service/cliente.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, DatePipe],
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = []

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().pipe(
      tap(clientes => {
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    )
    .subscribe(
      clientes => this.clientes = clientes
    );
  }

  deleteCliente(cliente: Cliente): void {
    Swal.fire({
      title: `¿Estas seguro de eliminar a ${cliente.nombre} ${cliente.apellido}?`,
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(cliente.id ?? 0).subscribe(
          response => {
            this.clientes = this.clientes.filter(c => c.id !== cliente.id);
          }
        )
        Swal.fire({
          title: "Eliminado!",
          text: `El cliente ${cliente.nombre} ha sido eliminado.`,
          icon: "success"
        });
      }
    });
   
  }
}
