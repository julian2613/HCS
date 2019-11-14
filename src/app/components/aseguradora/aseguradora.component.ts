import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aseguradora',
  templateUrl: './aseguradora.component.html',
  styleUrls: ['./aseguradora.component.scss']
})
export class AseguradoraComponent implements OnInit {

  public dinamycTextModal: string;
  public activeModal: NgbActiveModal;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  openModal(content, styles?) {
    debugger;
    this.dinamycTextModal = 'Si el problema persiste, contacte con el proveedor del servicio.';
    this.activeModal = this.modalService.open(content, { windowClass: styles });
  }

}
