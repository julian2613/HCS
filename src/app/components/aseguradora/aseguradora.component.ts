import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as datos from './datos.json';
import { FormsService } from 'src/app/services/forms/forms.service.js';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IAseguradoraProps } from 'src/app/interfaces/IAseguradoraProps.js';

@Component({
  selector: 'app-aseguradora',
  templateUrl: './aseguradora.component.html',
  styleUrls: ['./aseguradora.component.scss'],
  providers: [FormsService]
})
export class AseguradoraComponent implements OnInit, OnDestroy {
  @ViewChild('diligenciarCorreo', { static: true }) modalCorreo;

  public propiedadesEmpresa: IAseguradoraProps;

  public dinamycTextModal: string;
  public activeModal: NgbActiveModal;
  public bienesYValores: Array<object> = datos.bienesYValoresPymes;
  public amparos: Array<object> = datos.amparos;
  public asistenciaPymes: Array<object> = datos.asistenciaPymes;
  public aseguradoraFormGroup: FormGroup;
  public totalValor: number;
  public objetoFinal: any;
  public emailFormGroup: FormGroup;
  public showSuccessToast: boolean = false;
  public showErrorToast: boolean = false;
  public autohideSuccess: boolean = true;
  public autohideError: boolean = true;
  public buttonDisabled: boolean = false;
  public aseguradorasList: Array<any> = datos.aseguradoras;

  constructor(
    private modalService: NgbModal,
    private formService: FormsService,
    private httpClient: HttpClient
  ) {
    this.aseguradoraFormGroup = this.formService.formularioCotizacionPymes();
    this.emailFormGroup = this.formService.formularioCorreoElectronico();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.aseguradoraFormGroup.reset();
  }

  selectCotizador(objetoCotizadora: IAseguradoraProps, modalSeleccion: any): void {
    this.openModal(modalSeleccion);
    this.propiedadesEmpresa = objetoCotizadora;
  }

  public abrirCotizador(modal: any): void {
    this.activeModal.close();
    this.openModal(modal, 'myCustomModalClass');
  }

  public openModal(content, styles?): void {
    this.dinamycTextModal = 'Si el problema persiste, contacte con el proveedor del servicio.';
    this.activeModal = this.modalService.open(content, { windowClass: styles });
  }

  public closeModal(): void {
    this.activeModal.close();
    this.aseguradoraFormGroup.reset();

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

  public generarDocumento(formulario: any): void {
    this.aseguradoraFormGroup = formulario;
    let bienesYValores: object[] = [];
    let amparos: object[] = [];
    let asistenciaPymes: object[] = [];
    let deduciblesLista: object[] = [];
    let clausulasLista: object[] = [];

    datos.bienesYValoresPymes.forEach(element => {
      bienesYValores.push({
        label: element.nombre,
        valor: this.aseguradoraFormGroup.controls['bienesYValores'].get(element.idFormulario).value
      });
    });
    datos.amparos.forEach(element => {
      amparos.push({
        label: element.nombre,
        valor: this.aseguradoraFormGroup.controls['amparos'].get(element.idFormulario).value
      });
    });
    datos.deducibles.forEach(element => {
      deduciblesLista.push({
        label: element.nombre,
        valor: element.valor
      });
    });
    datos.clausulasAdicionales.forEach(element => {
      clausulasLista.push({
        valor: element.valor
      });
    });
    const objetoJson: object = {
      fecha: this.aseguradoraFormGroup.controls['datosCliente'].get('fecha').value,
      nombreCliente: this.aseguradoraFormGroup.controls['datosCliente'].get('nombreCliente').value,
      documento: this.aseguradoraFormGroup.controls['datosCliente'].get('documento').value,
      telefono: this.aseguradoraFormGroup.controls['datosCliente'].get('telefono').value,
      asesor: this.aseguradoraFormGroup.controls['datosCliente'].get('asesor').value,
      agencia: this.aseguradoraFormGroup.controls['datosCliente'].get('agencia').value,
      direccion: this.aseguradoraFormGroup.controls['datosRiesgo'].get('direccion').value,
      ciudad: this.aseguradoraFormGroup.controls['datosRiesgo'].get('ciudad').value,
      barrio: this.aseguradoraFormGroup.controls['datosRiesgo'].get('barrio').value,
      departamento: this.aseguradoraFormGroup.controls['datosRiesgo'].get('departamento').value,
      pisos: this.aseguradoraFormGroup.controls['datosRiesgo'].get('pisos').value,
      sotanos: this.aseguradoraFormGroup.controls['datosRiesgo'].get('sotanos').value,
      anoConstruccion: this.aseguradoraFormGroup.controls['datosRiesgo'].get('anoConstruccion').value,
      actividad: this.aseguradoraFormGroup.controls['datosRiesgo'].get('actividad').value,
      irregPlanta: this.aseguradoraFormGroup.controls['datosRiesgo'].get('irregPlanta').value,
      irregAltura: this.aseguradoraFormGroup.controls['datosRiesgo'].get('irregAltura').value,
      tipoEstructura: this.aseguradoraFormGroup.controls['datosRiesgo'].get('tipoEstructura').value,
      grupoConstruccion: this.aseguradoraFormGroup.controls['datosRiesgo'].get('grupoConstruccion').value,
      usoDelRiesgo: this.aseguradoraFormGroup.controls['datosRiesgo'].get('usoDelRiesgo').value,
      estructuraReforzada: this.aseguradoraFormGroup.controls['datosRiesgo'].get('estructuraReforzada').value,
      danosPrevios: this.aseguradoraFormGroup.controls['datosRiesgo'].get('danosPrevios').value,
      bienesAsegurados: this.aseguradoraFormGroup.controls['datosRiesgo'].get('bienesAsegurados').value,
      bienesYValores: bienesYValores,
      amparos: amparos,
      asistenciaPymes: asistenciaPymes,
      deducibles: deduciblesLista,
      clasusulas: clausulasLista,
      observacion: this.aseguradoraFormGroup.controls['observacion'].value,
      totalValorAsegurado: this.totalValorAsegurado
    };
    this.activeModal.close();
    this.objetoFinal = objetoJson;
    debugger;
    this.openModal(this.modalCorreo);
  }

  public get controlFormularioBYV(): any {
    return this.aseguradoraFormGroup.get('bienesYValores');
  }

  public get controlFormularioAmparos(): any {
    return this.aseguradoraFormGroup.get('amparos');
  }

  public enviarDocumento(): void {
    this.buttonDisabled = true;
    setTimeout(() => {
      this.buttonDisabled = false;
    }, 5000);
    const body: any = {
      template: {
        name: 'pyme',
        parameters: this.objetoFinal
      },
      mail: {
        to: this.emailFormGroup.controls['email'].value
      }
    };
    this.httpClient.post('http://ec2-18-228-5-3.sa-east-1.compute.amazonaws.com:8080/hcs-1.0/report/generate', body).subscribe((response: any) => {
      this.showSuccessToast = true;
      this.activeModal.close();
    }, ((e: any) => {
      console.error(e);
      this.showErrorToast = true;
    }));
  }
}
