/** Importamos viewChild y NgForm */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-addproveedores',
  templateUrl: './addproveedores.component.html',
  styleUrls: ['./addproveedores.component.css']
})
export class AddproveedoresComponent implements OnInit {

  /** Agregamos @ViewChild como decorador para hacer una vista de formpro,
   * y formpro: sera de tipo -> NgForm
   */
  @ViewChild('formpro') formpro: NgForm;
  proveedor: any;

  /** Cargar datos desde Select - agregamos un array en este caso de todas
   * las ciudades de colombia   ciudades: String[] = [ 'las ciudades que querramos']
   */
  ciudades: String[] = [
    'Bogota', 'Cartagena', 'Bucaramanga', 'Medellin', 'Barranquilla', 'Cali',
    'Sincelejo', 'Santa Marta', 'Monteria', 'Cùcuta', 'Pereira', 'Monteria', 'Otra'
  ];

  constructor() {
    /**creamos un objeto que tenga los campos de addprovedores */
    this.proveedor = {
      nombre: '',
      telefono: null,
      nacionalidad: '',
      email: '',
      ciudad: '',
      empresa: ''
    };

  }
  /** Creamos el metodo para cuando el boton del formulario envie los datos,
   *   this.obj.atributo    this.viewChild.value.atributo
   * { this.proveedor.name = this.formpro.value.nombre}
   */
  onSubmit() {

    this.proveedor.nombre = this.formpro.value.nombre;
    this.proveedor.telefono = this.formpro.value.telefono;
    this.proveedor.nacionalidad = this.formpro.value.nacionalidad;
    this.proveedor.email = this.formpro.value.email;
    this.proveedor.ciudad = this.formpro.value.ciudad;
    this.proveedor.empresa = this.formpro.value.empresa;

    /** Una vez enviado los datos se resete */
    this.formpro.reset();
  }
  ngOnInit() {
  }

}
