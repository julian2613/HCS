import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as datos from './datos.json';
import { FormsService } from 'src/app/services/forms/forms.service.js';
import { FormGroup } from '@angular/forms';
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

  constructor(
    private modalService: NgbModal,
    private formService: FormsService
  ) {
    this.aseguradoraFormGroup = this.formService.formularioCotizacionPymes();
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

  public generarDocumento(): void {

  }

}
