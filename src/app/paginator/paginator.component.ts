import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'paginator-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginador: any;
  pages: number[] = [];
  desde: number = 0;
  hasta: number = 0;

  ngOnInit() {
    this.initPaginador();
  }

  ngOnChanges(changes: SimpleChanges) {
    let paginadorActualizado = changes['paginador'];
    if(paginadorActualizado.previousValue) {
      this.initPaginador();
    }
  }

  private initPaginador(): void {
    this.desde = Math.min( Math.max(1, this.paginador.page.number-4), this.paginador.page.totalPages-5);
    this.hasta = Math.max( Math.min(this.paginador.page.totalPages, this.paginador.page.number+4), 6);
    if(this.paginador.page.totalPages > 5) {
      this.pages = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    } else {
    this.pages = new Array(this.paginador.page.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }
}
