import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as datos from './datos.json';
@Component({
  selector: 'app-aseguradora',
  templateUrl: './aseguradora.component.html',
  styleUrls: ['./aseguradora.component.scss']
})
export class AseguradoraComponent implements OnInit {

  public dinamycTextModal: string;
  public activeModal: NgbActiveModal;
  public bienesYValores: Array<object> = datos.bienesYValores;
  public amparos: Array<object> = datos.amparos;
  public asistenciaPymes: Array<object> = datos.asistenciaPymes;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  public openModal(content, styles?): void {
    this.dinamycTextModal = 'Si el problema persiste, contacte con el proveedor del servicio.';
    this.activeModal = this.modalService.open(content, { windowClass: styles });
  }

  public closeModal(): void {
    this.activeModal.close();
  }

  public generarDocumento():void{
    
  }

}
