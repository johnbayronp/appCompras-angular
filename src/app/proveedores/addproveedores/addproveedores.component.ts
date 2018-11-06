/** Importamos viewChild y NgForm */
import { Component, OnInit, ViewChild } from '@angular/core';
/** Clases de Reactive Forms , importar Validators para las validaciones */
import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';
/** Importar un servicio  */
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-addproveedores',
  templateUrl: './addproveedores.component.html',
  styleUrls: ['./addproveedores.component.css']
})
export class AddproveedoresComponent implements OnInit {

  proveedorForm: FormGroup;
  proveedor: any;

  /** Cargar datos desde Select - agregamos un array en este caso de todas
   * las ciudades de colombia   ciudades: String[] = [ 'las ciudades que querramos']
   */
  ciudades: String[] = [
    'Bogota', 'Cartagena', 'Bucaramanga', 'Medellin', 'Barranquilla', 'Cali',
    'Sincelejo', 'Santa Marta', 'Monteria', 'Cùcuta', 'Pereira', 'Monteria', 'Otra'
  ];

  constructor(  private proveedoresService: ProveedoresService,
                private pf: FormBuilder) {
  }

  ngOnInit() {
    /**creamos un objeto que tenga los campos de addprovedores */
    this.proveedorForm = this.pf.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      telefono: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      email: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      empresa: ['', [Validators.required]]
    });
  }

  /** Creamos el metodo para cuando el boton del formulario envie los datos,
   *   this.obj.atributo    this.viewChild.value.atributo
   * { this.proveedor.name = this.formpro.value.nombre}
   */
  onSubmit() {

    this.proveedor = this.saveProveedor();
    /** ENVIO METODO POST*/
    this.proveedoresService.postProveedor(this.proveedor)
    .subscribe(newprov => {
              });
    this.proveedorForm.reset();
  }

  saveProveedor() {

    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      telefono: this.proveedorForm.get('telefono').value,
      nacionalidad: this.proveedorForm.get('nacionalidad').value,
      email: this.proveedorForm.get('email').value,
      ciudad: this.proveedorForm.get('ciudad').value,
      empresa: this.proveedorForm.get('empresa').value
    };

    return saveProveedor;
  }

}
