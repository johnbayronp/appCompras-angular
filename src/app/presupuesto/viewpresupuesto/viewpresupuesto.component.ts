import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from '../../servicios/presupuesto.service';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';
@Component({
  selector: 'app-viewpresupuesto',
  templateUrl: './viewpresupuesto.component.html',
  styleUrls: ['./viewpresupuesto.component.css']
})
export class ViewpresupuestoComponent implements OnInit {
  /** propiedad de tipo array para poder iterar en el html de la tabla */
  presupuestos: any = [];
  /** pasamos los servicios en el parametro presupuestosService
   */
  constructor(private presupuestosService: PresupuestoService) {
    /** el parametro le agregamos el metodo GET creado en los servicios
     * y subscribimos en el parametro presupuesto un ciclo for que nos
     * asginara un id para cada adiccion de un dato
     */
    this.presupuestosService.getPresupuestos().subscribe(presupuesto => {
      for (const id$ in presupuesto) {
        /** si la propiedad id$ existe en el objeto (Run) */
        if (presupuesto.hasOwnProperty(id$)) {
        /** creamos la constate p para que guarde nuestro obj iterado
         * con el id , y asignamos que para cada p.id$ tendremos un id$,
         * y pasamos nuestro nuevo dato al array con .push */
          const p = presupuesto[id$];
            p.id$ = id$;
            this.presupuestos.push(p);
        }
      }
    });
  }

  ngOnInit() {
  }

  recarga() {

          /*** Para que se refresque la tabla  hacemos el array  presuspuesto = vacio 
           * y copiamos todo el metodo susbcribe de getPresupuesto**/
          this.presupuestos = [];
          this.presupuestosService.getPresupuestos().subscribe(presupuesto => {
            for (const id$ in presupuesto) {
               if (presupuesto.hasOwnProperty(id$)) {
                   const p = presupuesto[id$];
                    p.id$ = id$;
                    this.presupuestos.push(p);
                }
            }
          });
  }

  eliminarPresupuesto(id$) {
    this.presupuestosService.delPresupuesto(id$)
        .subscribe(res => {
          this.recarga();
    });
  }

}
