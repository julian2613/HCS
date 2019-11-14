import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class FormsService {

  constructor(
    private formBulder: FormBuilder
  ) { }

  public getFormDatosCliente(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      fecha: [null , [Validators.required]],
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

  public getFormBienesYValores(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      edificios: [0, [Validators.required]],
      indiceVariable: [0, [Validators.required]],
      contenidos: [0, [Validators.required]],
      mueblesEnseres: [0, [Validators.required]],
      electricoElectronicoFijo: [0, [Validators.required]],
      electricoElectronicoMovil: [0, [Validators.required]],
      maquinarias: [0, [Validators.required]],
      mercancias: [0, [Validators.required]],
      materiaPrima: [0, [Validators.required]]
    });
    return formGroup;
  }

  public getFormAmparos(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      generales: [0, [Validators.required]],
      lucroCesanteServPuplic: [0, [Validators.required]],
      lucroCesanteProveedores: [0, [Validators.required]],
      infidelidadEmpleados: [0, [Validators.required]],
      equipoEléctricoElectrónico: [0, [Validators.required]],
      equipoEléctricoElectrónicoMóvil: [0, [Validators.required]],
      frigorificos: [0, [Validators.required]],
      vidasGrupo: [0, [Validators.required]],
      terremotoTemblorErupciónvolcánica: [0, [Validators.required]],
      accidentesPersonales: [0, [Validators.required]],
      AMIT_AMCCPH: [0, [Validators.required]],
      gastosMedicos: [0, [Validators.required]],
      hurtoCalificado: [0, [Validators.required]],
      transporteValores: [0, [Validators.required]],
      hurtoSimplificado: [0, [Validators.required]],
      limiteDespacho: [0, [Validators.required]],
      hurtoCalificadoDineroEfectivo: [0, [Validators.required]],
      estimadoAnualDeclarado: [0, [Validators.required]],
      roturaCristalesVidrios: [0, [Validators.required]],
      roturaMaquinaria: [0, [Validators.required]],
      respCivilExtracontractual: [0, [Validators.required]],
      lucroCesanteIncendio: [0, [Validators.required]],
      lucroCesanteRoturaMaq: [0, [Validators.required]],
      porcentajeRecargos: [0, [Validators.required]]
    });
    return formGroup;
  }

  public formularioCotizacionPymes(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      datosCliente: this.getFormDatosCliente(),
      datosRiesgo: this.getFormDatosRiesgo(),
      bienesYValores: this.getFormBienesYValores(),
      amparos: this.getFormAmparos()
    });
    return formGroup;
  }
}
