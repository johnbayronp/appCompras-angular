import { Component, OnInit } from '@angular/core';

/** Clases de Reactive Forms , importar Validators para las validaciones */
import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';

/** Importamos el servicio creado y su ruta  */
import { ProveedoresService } from './../../servicios/proveedores.service';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  buscador: FormControl;
  busqueda: string;

  /** proveedores que llegan de la base de datos */
  proveedores: any = [];

  /** spinner cargando  */
  cargando = true;


  constructor(private proveedoresService: ProveedoresService) {
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
      this.cargando = false;
    });
  }

  ngOnInit() {}

}
