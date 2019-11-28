import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { IAseguradoraProps } from 'src/app/interfaces/IAseguradoraProps';
import * as datos from './../aseguradora/datos.json';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from 'src/app/services/forms/forms.service.js';
@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.scss']
})
export class PropiedadesComponent implements OnInit {

  @Input() public tasasCambio: object;
  @Input() public propiedadesAseguradora: IAseguradoraProps;
  @Output() public cerrarModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public enviarDatos: EventEmitter<any> = new EventEmitter<any>();

  public aseguradoraFormGroup: FormGroup;
  public activeModal: NgbActiveModal;
  public bienesYValores: Array<object> = datos.bienesYValoresPropiedad;
  public asistenciaClausulas: Array<object> = datos.clausulasAdicionalesPropiedad;
  public asistenciaPropiedad: Array<object> = datos.asistenciaPropiedad;
  public asistenciaDeducibles: Array<object> = datos.deduciblesPropiedad;
  public asistenciaPrivadaPropiedad: Array<object> = datos.asistenciaPrivadaPropiedad;
  public totalValor: number;
  public objetoFinal: any;
  public emailFormGroup: FormGroup;
  public showSuccessToast = false;
  public showErrorToast = false;
  public autohideSuccess = true;
  public autohideError = true;
  public buttonDisabled = false;

  public constructor(
    private formService: FormsService
  ) {
    this.aseguradoraFormGroup = this.formService.formularioCotizacionPropiedad();
  }

  public ngOnInit(): void {
  }

  // public get prima(): any {
  //   return this.totalValorAsegurado ? this.totalValorAsegurado * (+this.propiedadesAseguradora.tasaPymes) : 0;
  // }

  // public get iva(): any {
  //   return (this.prima * 0.19);
  // }

  // public get totalAnual(): any {
  //   return (this.prima + this.iva);
  // }

  public get controlFormularioBYV(): any {
    return this.aseguradoraFormGroup.get('bienesYValores');
  }

  public get controlFormularioAmparos(): any {
    return this.aseguradoraFormGroup.get('amparos');
  }


  // public get totalValorAsegurado(): number {
  //   const total: number =
  //     +this.aseguradoraFormGroup.controls['bienesYValores'].get('edificios').value +
  //     +this.aseguradoraFormGroup.controls['bienesYValores'].get('indiceVariable').value +
  //     +this.aseguradoraFormGroup.controls['bienesYValores'].get('contenidos').value +
  //     +this.aseguradoraFormGroup.controls['bienesYValores'].get('mueblesEnseres').value +
  //     +this.aseguradoraFormGroup.controls['bienesYValores'].get('electricoElectronicoFijo').value +
  //     +this.aseguradoraFormGroup.controls['bienesYValores'].get('electricoElectronicoMovil').value +
  //     +this.aseguradoraFormGroup.controls['bienesYValores'].get('maquinarias').value +
  //     +this.aseguradoraFormGroup.controls['bienesYValores'].get('mercancias').value +
  //     +this.aseguradoraFormGroup.controls['bienesYValores'].get('materiaPrima').value +
  //     +this.aseguradoraFormGroup.controls['amparos'].get('hurtoCalificadoDineroEfectivo').value +
  //     +this.aseguradoraFormGroup.controls['amparos'].get('respCivilExtracontractual').value +
  //     +this.aseguradoraFormGroup.controls['amparos'].get('lucroCesanteIncendio').value;
  //   return total;
  // }

  public updateFormGroup(event: any, controlName: string): void {
    this.aseguradoraFormGroup.controls[controlName] = event;
  }

  public enviarSolicitud(): void {
    // this.aseguradoraFormGroup.controls['prima'].setValue(this.prima);
    // this.aseguradoraFormGroup.controls['iva'].setValue(this.iva);
    // this.aseguradoraFormGroup.controls['totalAnual'].setValue(this.totalAnual);
    this.enviarDatos.emit(this.construirObjeto());
  }

  public closeModal(): void {
    this.cerrarModal.emit(true);
  }


  private construirObjeto(): object {
    const bienesYValoresList: object[] = [];
    const amparosList: object[] = [];
    const asistenciaPymesList: object[] = [];
    const deduciblesList: object[] = [];
    const clausulasList: object[] = [];

    datos.bienesYValoresPymes.forEach(element => {
      bienesYValoresList.push({
        label: element.nombre,
        valor: this.aseguradoraFormGroup.controls.bienesYValores.get(element.idFormulario).value
      });
    });
    datos.amparosPymes.forEach(element => {
      amparosList.push({
        label: element.nombre,
        valor: this.aseguradoraFormGroup.controls.amparos.get(element.idFormulario).value
      });
    });
    datos.asistenciaPymes.forEach(element => {
      asistenciaPymesList.push({
        label: element.nombre,
        valor: element.valor
      });
    });
    datos.deduciblesPymes.forEach(element => {
      deduciblesList.push({
        label: element.nombre,
        valor: element.valor
      });
    });
    datos.clausulasAdicionalesPymes.forEach(element => {
      clausulasList.push({
        valor: element.valor
      });
    });
    const objetoJson: object = {
      logo: this.propiedadesAseguradora.url,
      fecha: this.aseguradoraFormGroup.controls.datosCliente.get('fecha').value,
      nombreCliente: this.aseguradoraFormGroup.controls.datosCliente.get('nombreCliente').value,
      documento: this.aseguradoraFormGroup.controls.datosCliente.get('documento').value,
      telefono: this.aseguradoraFormGroup.controls.datosCliente.get('telefono').value,
      asesor: this.aseguradoraFormGroup.controls.datosCliente.get('asesor').value,
      agencia: this.aseguradoraFormGroup.controls.datosCliente.get('agencia').value,
      direccion: this.aseguradoraFormGroup.controls.datosRiesgo.get('direccion').value,
      ciudad: this.aseguradoraFormGroup.controls.datosRiesgo.get('ciudad').value,
      barrio: this.aseguradoraFormGroup.controls.datosRiesgo.get('barrio').value,
      departamento: this.aseguradoraFormGroup.controls.datosRiesgo.get('departamento').value,
      pisos: this.aseguradoraFormGroup.controls.datosRiesgo.get('pisos').value,
      sotanos: this.aseguradoraFormGroup.controls.datosRiesgo.get('sotanos').value,
      anoConstruccion: this.aseguradoraFormGroup.controls.datosRiesgo.get('anoConstruccion').value,
      actividad: this.aseguradoraFormGroup.controls.datosRiesgo.get('actividad').value,
      irregPlanta: this.aseguradoraFormGroup.controls.datosRiesgo.get('irregPlanta').value,
      irregAltura: this.aseguradoraFormGroup.controls.datosRiesgo.get('irregAltura').value,
      tipoEstructura: this.aseguradoraFormGroup.controls.datosRiesgo.get('tipoEstructura').value,
      grupoConstruccion: this.aseguradoraFormGroup.controls.datosRiesgo.get('grupoConstruccion').value,
      usoDelRiesgo: this.aseguradoraFormGroup.controls.datosRiesgo.get('usoDelRiesgo').value,
      estructuraReforzada: this.aseguradoraFormGroup.controls.datosRiesgo.get('estructuraReforzada').value,
      danosPrevios: this.aseguradoraFormGroup.controls.datosRiesgo.get('danosPrevios').value,
      bienesAsegurados: this.aseguradoraFormGroup.controls.datosRiesgo.get('bienesAsegurados').value,
      bienesYValores: bienesYValoresList,
      amparos: amparosList,
      asistenciaPymes: asistenciaPymesList,
      deducibles: deduciblesList,
      clasusulas: clausulasList,
      observacion: this.aseguradoraFormGroup.controls.observacion.value,
      // totalValorAsegurado: this.totalValorAsegurado,
      prima: this.aseguradoraFormGroup.controls.prima.value,
      iva: this.aseguradoraFormGroup.controls.iva.value,
      totalAnual: this.aseguradoraFormGroup.controls.totalAnual.value,
      color: this.propiedadesAseguradora.color
    };
    return objetoJson;
  }
}
