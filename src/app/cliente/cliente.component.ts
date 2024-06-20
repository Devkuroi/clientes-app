import { Component, OnInit, inject } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../service/cliente.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, DatePipe, PaginatorComponent],
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = []
  paginator: any;


  private clienteService: ClienteService = inject(ClienteService);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    let page = 0;
    this.activeRoute.params.subscribe(params => {
      page = params['page'] ?? 0;
    });
    this.clienteService.getClientes(page).subscribe(
      response => {
        this.clientes = response.content
        this.paginator = response;
        console.log(this.paginator);
      }
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
