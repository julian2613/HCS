import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-usuario',
  templateUrl: './tarjeta-usuario.component.html',
  styleUrls: ['./tarjeta-usuario.component.scss']
})
export class TarjetaUsuarioComponent implements OnInit {

  @Input() public usuario: any;
  constructor() { }

  ngOnInit() {
  }

}
