import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as datos from './datos.json';
import { FormsService } from 'src/app/services/forms/forms.service.js';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IAseguradoraProps } from 'src/app/interfaces/IAseguradoraProps.js';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public aseguradorasList: Array<any> = datos.aseguradoras;
  public aseguradoraFormGroup: FormGroup;
  public totalValor: number;
  public objetoFinal: any;
  public emailFormGroup: FormGroup;
  public showSuccessToast: boolean = false;
  public showErrorToast: boolean = false;
  public autohideSuccess: boolean = true;
  public autohideError: boolean = true;
  public buttonDisabled: boolean = false;
  public tipoDocumento: string;
  
  constructor(
    private modalService: NgbModal,
    private formService: FormsService,
    private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService
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

  public generarObjetoPyme(objeto: any): void {
    this.objetoFinal = objeto;
    this.activeModal.close();
    this.tipoDocumento = 'pyme';
    console.log(this.objetoFinal);
    this.openModal(this.modalCorreo);
  }

  public generarObjetoCopropiedad(objeto: any): void {
    this.objetoFinal = objeto;
    this.tipoDocumento = 'copropiedad';
    this.activeModal.close();
    console.log(this.objetoFinal);
    this.openModal(this.modalCorreo);
  }

  public enviarDocumento(): void {
    const body: any = {
      template: {
        name: this.tipoDocumento,
        parameters: this.objetoFinal
      },
      mail: {
        to: this.emailFormGroup.controls['email'].value
      }
    };
    this.spinnerService.show();
    this.httpClient.post('http://localhost:8080/report/generate', body).subscribe((response: any) => {
      this.spinnerService.hide();
      this.showSuccessToast = true;
      this.activeModal.close();
    }, ((e: any) => {
      this.spinnerService.hide();
      console.error(e);
      this.showErrorToast = true;
    }));
  }
}
