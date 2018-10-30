/** Crear servicios -> ng g service carpetaServicios/nombreServicio --spec false */
import { Injectable } from '@angular/core';
/** Clases Necesarias para poder importar POST */
import {  Headers, Http, Response } from '@angular/http';
/** Importamos la libreria */
import { map } from 'rxjs/operators';
import 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  /** Creamos el nombre de nuestra propiedad donde guardaremos la URL de nuestra
   *  base de datos. y pasamos el nombre con .json con el que se guardara en firebase*/

   presURL = 'https://comprasapp-3f8b4.firebaseio.com/presupuesto.json';
   preURL = 'https://comprasapp-3f8b4.firebaseio.com/presupuesto';
  constructor(private http: HttpClient) {}

  /** METODO POST - CREATE */
  /** Creamos nuestro metodo para POST, y pasamos el parametro presupuesto que
   * Viene desde el componente addpres.TS
   */
  postPresupuesto(presupuesto: any) {
    /**El parametro que va recibir lo convierte en una cadena*/
    const newpres = JSON.stringify(presupuesto);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    /** En la peticion post que enviamos la url ,
     * .pipe(map(respuesta => repuesta) la respuesta que se reciba del servidor
     * la pasamos a la consola en formato json.
    */

    return this.http.post( this.presURL, newpres, {headers})
    .pipe(map( (res => {
      console.log(res);
      return res;
    })));
  }

  /**METODO GET - READ */
  getPresupuestos() {
    return this.http.get(this.presURL)
    .pipe(map( res => res));
  }

  /** Http PUT - UPLOAD */
  getPresupuesto(id$) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.get(url).pipe(map(res => res));
  }

  putPresupuesto(presupuesto: any, id$: string) {
    const newpre = JSON.stringify(presupuesto);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.preURL}/${id$}.json`;

    return this.http.put(url, newpre, {headers}).pipe(
      map( res => {
        console.log(res);
        return(res);
      })
    );

  }
}

