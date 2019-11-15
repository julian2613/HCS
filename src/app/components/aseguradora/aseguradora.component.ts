import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as datos from './datos.json';
import { FormsService } from 'src/app/services/forms/forms.service.js';
import { FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-aseguradora',
  templateUrl: './aseguradora.component.html',
  styleUrls: ['./aseguradora.component.scss'],
  providers: [FormsService]
})
export class AseguradoraComponent implements OnInit, OnDestroy {

  public dinamycTextModal: string;
  public activeModal: NgbActiveModal;
  public bienesYValores: Array<object> = datos.bienesYValores;
  public amparos: Array<object> = datos.amparos;
  public asistenciaPymes: Array<object> = datos.asistenciaPymes;
  public aseguradoraFormGroup: FormGroup;
  public totalValor: number;
  public objetoFinal: any;
  public emailFormGroup: FormGroup;
  public showToast: boolean = false;
  public autohide: boolean = true;

  constructor(
    private modalService: NgbModal,
    private formService: FormsService,
    private httpClient: HttpClient
  ) {
    this.aseguradoraFormGroup = this.formService.formularioCotizacionPymes();
    this.emailFormGroup = this.formService.formularioCorreoElectronico();
    console.log(this.aseguradoraFormGroup);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.aseguradoraFormGroup.reset();
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

  public generarDocumento(modalCorreo: any): void {
    let bienesYValores: object[] = [];
    let amparos: object[] = [];
    let asistenciaPymes: object[] = [];
    datos.bienesYValores.forEach(element => {
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
    datos.asistenciaPymes.forEach(element => {
      asistenciaPymes.push({
        label: element.nombre,
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
      asistenciaPymes: asistenciaPymes
    }
    this.activeModal.close();
    this.objetoFinal = objetoJson;
    this.openModal(modalCorreo);
  }

  public enviarDocumento():void {
    const body: any ={
      "template": {
        "name": "pyme",
        "parameters": this.objetoFinal
      },
      "mail": {
        "to": this.emailFormGroup.controls['email'].value
      }
    }
    // this.httpClient.post('http://ec2-18-228-5-3.sa-east-1.compute.amazonaws.com:8080/hcs-1.0/report/generate', body).subscribe((response: any)=>{
    //   console.log(response);

    // });
    this.showToast = !this.showToast;
  }

}
