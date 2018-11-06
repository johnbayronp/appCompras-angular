import { Component, OnInit } from '@angular/core';
/** Importamos el servicio creado y su ruta  */
import { ProveedoresService } from './../../servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  /** proveedores que llegan de la base de datos */
  proveedores: any = [];

  constructor(private proveedoresService: ProveedoresService) {

    /** -------------------------- METODO GET ------------------------------*/
    this.proveedoresService.getProveedores().subscribe(proveedor => {
      for (const id$ in proveedor) {
        /** si la propiedad id$ existe en el objeto (Run) */
        if (proveedor.hasOwnProperty(id$)) {
        /** creamos la constate p para que guarde nuestro obj iterado
         * con el id , y asignamos que para cada p.id$ tendremos un id$,
         * y pasamos nuestro nuevo dato al array con .push */
          const p = proveedor[id$];
            p.id$ = id$;
            this.proveedores.push(p);
        }
      }
    });

  }

  ngOnInit() {}

}
