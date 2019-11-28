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

  public activeModal: NgbActiveModal;
  public aseguradorasList: Array<any> = datos.aseguradoras;
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
    this.emailFormGroup = this.formService.formularioCorreoElectronico();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.objetoFinal = undefined;
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
    this.activeModal = this.modalService.open(content, { windowClass: styles });
  }

  public closeModal(): void {
    this.activeModal.close();

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
