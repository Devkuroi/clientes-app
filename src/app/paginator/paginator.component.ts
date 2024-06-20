import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit {
  @Input() paginador: any;
  pages: number[] = [];

  ngOnInit(): void {
    console.log(this.paginador.page.totalPages)
    this.pages = new Array(this.paginador.page.totalPages).fill(0).map((_valor, indice) => indice + 1)
  }
}
