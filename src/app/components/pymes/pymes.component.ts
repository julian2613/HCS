import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAseguradoraProps } from 'src/app/interfaces/IAseguradoraProps';
import { FormsService } from 'src/app/services/forms/forms.service';
import { FormGroup } from '@angular/forms';
import * as datos from './../aseguradora/datos.json';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pymes',
  templateUrl: './pymes.component.html',
  styleUrls: ['./pymes.component.scss']
})
export class PymesComponent implements OnInit {

  @Input() public tasasCambio: object;
  @Input() public propiedadesAseguradora: IAseguradoraProps;
  @Output() public cerrarModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public enviarDatos: EventEmitter<any> = new EventEmitter<any>();

  public asistenciaDeducibles: Array<object> = datos.deducibles;
  public asistenciaClausulas: Array<object> = datos.clausulasAdicionales;
  public aseguradoraFormGroup: FormGroup;
  public activeModal: NgbActiveModal;
  public bienesYValores: Array<object> = datos.bienesYValoresPymes;
  public amparos: Array<object> = datos.amparos;
  public asistenciaPymes: Array<object> = datos.asistenciaPymes;
  public totalValor: number;
  public objetoFinal: any;
  public emailFormGroup: FormGroup;
  public showSuccessToast: boolean = false;
  public showErrorToast: boolean = false;
  public autohideSuccess: boolean = true;
  public autohideError: boolean = true;
  public buttonDisabled: boolean = false;

  public constructor(
    private formService: FormsService
  ) {
    this.aseguradoraFormGroup = this.formService.formularioCotizacionPymes();
  }

  public ngOnInit(): void {
  }

  public get controlFormularioBYV(): any {
    return this.aseguradoraFormGroup.get('bienesYValores');
  }

  public get controlFormularioAmparos(): any {
    return this.aseguradoraFormGroup.get('amparos');
  }


  public get totalValorAsegurado(): number {
    const total: number =
      +this.aseguradoraFormGroup.controls['bienesYValores'].get('edificios').value +
      +this.aseguradoraFormGroup.controls['bienesYValores'].get('indiceVariable').value +
      +this.aseguradoraFormGroup.controls['bienesYValores'].get('contenidos').value +
      +this.aseguradoraFormGroup.controls['bienesYValores'].get('mueblesEnseres').value +
      +this.aseguradoraFormGroup.controls['bienesYValores'].get('electricoElectronicoFijo').value +
      +this.aseguradoraFormGroup.controls['bienesYValores'].get('electricoElectronicoMovil').value +
      +this.aseguradoraFormGroup.controls['bienesYValores'].get('maquinarias').value +
      +this.aseguradoraFormGroup.controls['bienesYValores'].get('mercancias').value +
      +this.aseguradoraFormGroup.controls['bienesYValores'].get('materiaPrima').value +
      +this.aseguradoraFormGroup.controls['amparos'].get('hurtoCalificadoDineroEfectivo').value +
      +this.aseguradoraFormGroup.controls['amparos'].get('respCivilExtracontractual').value +
      +this.aseguradoraFormGroup.controls['amparos'].get('lucroCesanteIncendio').value;
    return total;
  }

  public updateFormGroup(event: any, controlName: string): void {
    this.aseguradoraFormGroup.controls[controlName] = event;
  }

  public enviarSolicitud():void {
    this.enviarDatos.emit(this.aseguradoraFormGroup);
  }

  public closeModal(): void {
    this.cerrarModal.emit(true);
  }
}
