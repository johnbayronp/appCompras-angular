import { Component, OnInit } from '@angular/core';
/** Clases de Reactive Forms , importar Validators para las validaciones */
import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';
/** Importar un servicio  */
import { PresupuestoService } from '../../servicios/presupuesto.service';


@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {

  /** Agregamos la clase formgroup a prespuestoForm que sera el mismo
   * nombre de nuestro formulario en el html
   * y creamos un presupuesto: any ( Guaradara en Json nuestros datos)
  */
  presupuestoForm: FormGroup;
  presupuesto: any;
  /** Creamos las variables artimeticas donde le daremos inicializacion */
  tipo: any;
  iva: any = 0;
  base: any;
  total: any = 0;


  /** pf: (creada por nosotros donde tendremos el contructor del form)
   * presupuestoService:(donde guardaremos nuestro servicio creado post)
   */
  constructor(private pf: FormBuilder,
              private presupuestoService: PresupuestoService) { }

  /** Inicializamos pasandole nuestros datos traidos del form de addpres.html
    * presupuestoForm es el mismo nombre de nuestro formulario en el html,
    * Para validar Metemos la propiedad  en un array ['',validacion], para
    * varias validaciones ['',[validacion1,validacion2]]
  */
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
    /** ENVIO METODO POST
     * Pasamos el parametro de presupuesto mediante el metodo creado en los
     * servicios de presupuesto y subscribimos en el parametro newpres que es
     * obj.JSON => presupuesto ( savePresupuesto = proveedor,fecha,concepto,...etc).
      y lo suscribimos como newpres mediante metodo POST ala base de datos firebase */
    this.presupuestoService.postPresupuesto(this.presupuesto)
    .subscribe(newpres => {

    });

    /** Reseteamos los campos del form */
    this.presupuestoForm.reset();
  }


  /** GUARDAR PRESUPUESTO
   *  Mediante el metodo get('') obtenemos el valor traido de presupuestoForm 
   * Esta funcion guarda los valores de cada input
  */
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
