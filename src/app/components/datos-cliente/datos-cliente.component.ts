import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsService } from 'src/app/services/forms/forms.service';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.scss']
})
export class DatosClienteComponent implements OnInit {

  public datosCliente: FormGroup;

  @Output() envioDatosCliente: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public constructor(
    public formService: FormsService
  ) {
    this.datosCliente = this.formService.getFormDatosCliente();
  }

  public ngOnInit(): void {
    this.subscribeChanges();
  }

  public subscribeChanges(): void {
    this.datosCliente.valueChanges.subscribe((datos: any) => {
      this.envioDatosCliente.emit(this.datosCliente);
    });
  }


}
