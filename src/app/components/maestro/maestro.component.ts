import { Component, OnInit } from '@angular/core';
import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public irAElemento(dato: any): void {
    const element: HTMLElement = document.getElementById(dato);
    element.scrollIntoView();
    element.scrollTop = 0;
    console.log(element);
    console.log(dato);
  }
}
