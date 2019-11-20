import { Component, OnInit, Inject } from '@angular/core';
import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {

  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
  }

  public irAElemento(dato: any): void {
    console.log('los datos' , dato);
    this.pageScrollService.scroll({ document: this.document, scrollTarget: `#${dato}` });
    // const element: HTMLElement = document.getElementById(dato);
    // element.scrollIntoView();
    // element.scrollTop = 0;
    // console.log(element);
    // console.log(dato);
  }
}
