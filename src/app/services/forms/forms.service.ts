import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class FormsService {

  constructor(
    private formBulder: FormBuilder
  ) { }

  public getFormDatosCliente(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      fecha: [null, [Validators.required]],
      nombreCliente: ['', [Validators.required]],
      documento: [0, [Validators.required, Validators.min(1)]],
      telefono: [0, [Validators.required, Validators.min(1)]],
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
      pisos: [0, [Validators.required, Validators.min(1)]],
      sotanos: [0, [Validators.required, Validators.min(1)]],
      anoConstruccion: ['', [Validators.required]],
      actividad: ['', [Validators.required]],
      irregPlanta: ['', [Validators.required]],
      irregAltura: ['', [Validators.required]],
      tipoEstructura: ['', [Validators.required]],
      grupoConstruccion: ['', [Validators.required]],
      usoDelRiesgo: ['', [Validators.required]],
      estructuraReforzada: ['', [Validators.required]],
      danosPrevios: ['', [Validators.required]],
      bienesAsegurados: ['', [Validators.required]]
    });
    return formGroup;
  }

  public getFormBienesYValores(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      edificios: [0, [Validators.required, Validators.min(1)]],
      indiceVariable: [0, [Validators.required, Validators.min(1)]],
      contenidos: [0, [Validators.required, Validators.min(1)]],
      mueblesEnseres: [0, [Validators.required, Validators.min(1)]],
      electricoElectronicoFijo: [0, [Validators.required, Validators.min(1)]],
      electricoElectronicoMovil: [0, [Validators.required, Validators.min(1)]],
      maquinarias: [0, [Validators.required, Validators.min(1)]],
      mercancias: [0, [Validators.required, Validators.min(1)]],
      materiaPrima: [0, [Validators.required, Validators.min(1)]]
    });
    return formGroup;
  }

  public getFormAmparos(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      generales: [0, [Validators.required, Validators.min(1)]],
      lucroCesanteServPuplic: [0, [Validators.required, Validators.min(1)]],
      lucroCesanteProveedores: [0, [Validators.required, Validators.min(1)]],
      infidelidadEmpleados: [0, [Validators.required, Validators.min(1)]],
      equipoEléctricoElectrónico: [0, [Validators.required, Validators.min(1)]],
      equipoEléctricoElectrónicoMóvil: [0, [Validators.required, Validators.min(1)]],
      frigorificos: [0, [Validators.required, Validators.min(1)]],
      vidasGrupo: [0, [Validators.required, Validators.min(1)]],
      terremotoTemblorErupciónvolcánica: [0, [Validators.required, Validators.min(1)]],
      accidentesPersonales: [0, [Validators.required, Validators.min(1)]],
      AMIT_AMCCPH: [0, [Validators.required, Validators.min(1)]],
      gastosMedicos: [0, [Validators.required, Validators.min(1)]],
      hurtoCalificado: [0, [Validators.required, Validators.min(1)]],
      transporteValores: [0, [Validators.required, Validators.min(1)]],
      hurtoSimplificado: [0, [Validators.required, Validators.min(1)]],
      limiteDespacho: [0, [Validators.required, Validators.min(1)]],
      hurtoCalificadoDineroEfectivo: [0, [Validators.required, Validators.min(1)]],
      estimadoAnualDeclarado: [0, [Validators.required, Validators.min(1)]],
      roturaCristalesVidrios: [0, [Validators.required, Validators.min(1)]],
      roturaMaquinaria: [0, [Validators.required, Validators.min(1)]],
      respCivilExtracontractual: [0, [Validators.required, Validators.min(1)]],
      lucroCesanteIncendio: [0, [Validators.required, Validators.min(1)]],
      lucroCesanteRoturaMaq: [0, [Validators.required, Validators.min(1)]],
      porcentajeRecargos: [0, [Validators.required, Validators.min(1)]]
    });
    return formGroup;
  }

  public formularioCotizacionPymes(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      datosCliente: this.getFormDatosCliente(),
      datosRiesgo: this.getFormDatosRiesgo(),
      bienesYValores: this.getFormBienesYValores(),
      totalValorAsegurado: [0],
      amparos: this.getFormAmparos()
    });
    return formGroup;
  }

  public formularioCorreoElectronico(): FormGroup {
    const formGroup: FormGroup = this.formBulder.group({
      email: ['', [Validators.required, Validators.pattern('^[_a-z0-9-]+(.[_a-z0-9-./]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$')]]
    });
    return formGroup;
  }
}
