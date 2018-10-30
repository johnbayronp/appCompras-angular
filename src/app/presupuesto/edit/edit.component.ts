import { Component, OnInit } from '@angular/core';
/** Clases de Reactive Forms , importar Validators para las validaciones */
import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';
/** Importar un servicio  */
import { PresupuestoService } from '../../servicios/presupuesto.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  presupuestoForm: FormGroup;
  presupuesto: any;
  /** Creamos las variables artimeticas donde le daremos inicializacion */
  tipo: any;
  iva: any = 0;
  base: any;
  total: any = 0;
  id: string;

  constructor(private pf: FormBuilder,
              private presupuestoService: PresupuestoService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
                this.activatedRouter.params.subscribe( parametros => {
                  this.id = parametros ['id'];
                  this.presupuestoService.getPresupuesto( this.id )
                  .subscribe( presupuesto =>
                    this.presupuesto = presupuesto);
                });
               }

  ngOnInit() {

    this.presupuestoForm = this.pf.group({
      proveedor: ['', [Validators.required, Validators.minLength(10) , Validators.maxLength(20)]],
      fecha: ['', [Validators.required]],
      concepto: ['', [Validators.required, Validators.minLength(10)]],
      base: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      iva: this.iva,
      total: this.total
    });

    /** inicializar el metodo onChanges */
    this.onChanges();
  }
  /** Metodo de cambio de valores
   *  * Guarda el objeto y aplicalos cambios en "valor" por medio de subscribe*
   *  this.presupuestoForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
  */
  onChanges(): void {
    this.presupuestoForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      /** base($dinero) * tipoIVA (19%,21%...ETC) */
      this.presupuestoForm.value.iva = this.base * this.tipo;
      /** Total =  base + IVA*/
      this.presupuestoForm.value.total = this.base + this.presupuestoForm.value.iva;
    });
  }

  /** metodo del boton enviar guardamos en presupuesto -> los valores
   * que traeremos desde el metodo de nuestro formulario.
   */
  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    /** Pasamos el parametro de presupuesto mediante el metodo creado en los
     * servicios de presupuesto y subscribimos en el parametro newpres.
     */

    this.presupuestoService.putPresupuesto(this.presupuesto, this.id)
    .subscribe(newpre => {
      /** Regresar a el listado despues de editar */
      this.router.navigate(['/viewpresupuesto']);
    });

  }

  /** Mediante el metodo get('') obtenemos el valor traido de presupuestoForm */
  savePresupuesto() {
    const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value
    };
    return savePresupuesto;
  }
}


