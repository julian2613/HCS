import { Component, OnInit, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import * as datos from './../aseguradora/datos.json';
@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {

  public arregloPerfiles: Array<any> = datos.perfiles;
  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
  }

  public irAElemento(dato: any): void {
    console.log('los datos', dato);
    this.pageScrollService.scroll({ document: this.document, scrollTarget: `#${dato}` });
  }
}
