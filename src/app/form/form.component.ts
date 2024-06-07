import { Component, OnInit, inject } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../cliente/cliente';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private clienteService: ClienteService = inject(ClienteService);
  private router: Router = inject(Router);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);

  clienteForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
    email: new FormControl('', [
      Validators.required, 
      Validators.email,
      Validators.nullValidator
    ]),
  });

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: ''
  }

  createMode: boolean = true;
  nameButton: string = 'Crear';
  errors: string[] = [];

  onSubmit() {
    this.cliente = {
      nombre: this.clienteForm.value.nombre ?? '',
      apellido: this.clienteForm.value.apellido ?? '',
      email: this.clienteForm.value.email ?? '',
    }

    this.clienteService.create(this.cliente).subscribe({
      next: (cliente) => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          title: 'Exito!',
          icon: 'success',
          text: `Cliente ${cliente.nombre} creado correctamente`,
        });
      },
      error: (err) => {
        this.errors = err.Errors;
      }
    });
  }

  
  cargarCliente(): void {
    this.activeRoute.params.subscribe((params) => {
      let id: number = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => {
          this.clienteForm.patchValue(cliente);
          this.createMode = false;
          this.nameButton = 'Actualizar';
        });
      }
    });
  }
  


  updateCliente(): void {
    this.cliente = {
      id: this.activeRoute.snapshot.params['id'],
      nombre: this.clienteForm.value.nombre ?? '',
      apellido: this.clienteForm.value.apellido ?? '',
      email: this.clienteForm.value.email ?? '',
    }
    this.clienteService.updateCliente(this.cliente).subscribe({
      next: (cliente) => {
      this.router.navigate(['/clientes']);
      Swal.fire({
        title: 'Exito!',
        icon: 'success',
        text: `Cliente ${cliente.nombre} actualizado correctamente`,
      });
    },
    error: (err) => {
      this.errors = err.Errors;
    }
    });
  }


  ngOnInit(): void {
    this.cargarCliente();
  }

  createOrUpdate(): void {
    this.createMode ? this.onSubmit() : this.updateCliente();

  }
}
