import { Component, OnInit } from '@angular/core';
/** Importamos el servicio creado y su ruta  */
import { ProveedoresService } from './../../servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores: any;
  /** Para iniciar nuestro servicio en el contructor utilizamos la
   * prioridad privada NombreDondeGuardaremosElServicioEnComponent: NombredelServicio
   */
  constructor(private proveedoresService: ProveedoresService) { }

  /** Corremos nuestro servicio en la variable mensaje y
   * asignamos en nuestro servicio el metodo ex: this.servicio.getCompras();
   */
  ngOnInit() {
    /** traemos el array de provedores de tipo {.json} */
    this.proveedores = this.proveedoresService.getProveedores();
  }

}
