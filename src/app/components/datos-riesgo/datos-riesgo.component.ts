import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsService } from 'src/app/services/forms/forms.service';
import { IAseguradoraProps } from 'src/app/interfaces/IAseguradoraProps';

@Component({
  selector: 'app-datos-riesgo',
  templateUrl: './datos-riesgo.component.html',
  styleUrls: ['./datos-riesgo.component.scss']
})
export class DatosRiesgoComponent implements OnInit {

  public datosRiesgo: FormGroup;

  @Output() envioDatosRiesgo: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() public propiedadesAseguradora: IAseguradoraProps;

  public constructor(private formService: FormsService) {
    this.datosRiesgo = this.formService.getFormDatosRiesgo();
  }

  public ngOnInit(): void {
    this.subscribeChanges();
  }

  public subscribeChanges(): void {
    this.datosRiesgo.valueChanges.subscribe((datos: any) => {
      this.envioDatosRiesgo.emit(this.datosRiesgo);
    });
  }

}
