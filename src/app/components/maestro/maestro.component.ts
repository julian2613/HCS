import { Component, OnInit } from '@angular/core';

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
    console.log(element);
    console.log(dato);
  }
}
