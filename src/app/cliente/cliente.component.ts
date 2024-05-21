import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = []

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }
}
