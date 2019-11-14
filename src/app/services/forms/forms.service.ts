import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class FormsService {

  constructor(
    private formBulder: FormBuilder
  ) { }

  public getFormDatosCliente(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      fecha: [Date, [Validators.required]],
      nombreCliente: ['', [Validators.required]],
      documento: [0, [Validators.required]],
      telefono: [0, [Validators.required]],
      asesor: ['', [Validators.required]],
      agencia: ['', [Validators.required]]
    });
    return formGroup;
  }

  public getFormDatosRiesgo(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      barrio: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      pisos: [0, [Validators.required]],
      sotanos: [0, [Validators.required]],
      añoConstruccion: ['', [Validators.required]],
      actividad: ['', [Validators.required]],
      irregPlanta: ['', [Validators.required]],
      irregAltura: ['', [Validators.required]],
      tipoEstructura: ['', [Validators.required]],
      grupoConstruccion: ['', [Validators.required]],
      usoDelRiesgo: ['', [Validators.required]],
      estructuraReforzada: ['', [Validators.required]],
      dañosPrevios: ['', [Validators.required]],
      bienesAsegurados: ['', [Validators.required]]
    });
    return formGroup;
  }
}
