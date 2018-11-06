import { Injectable } from '@angular/core';
/** Importamos las mismas clases del servicio presupuesto - upload firebasedb */
import {  Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable({
  providedIn: 'root'

})
export class ProveedoresService {


  /** Url de la base de datos para hacer las peticiones */
  provsURL = 'https://comprasapp-3f8b4.firebaseio.com/proveedores.json';
  provURL = 'https://comprasapp-3f8b4.firebaseio.com/proveedores';

  constructor(private http: HttpClient) {}

  /**METODO POST */
  postProveedor(proveedor: any) {
    /**El parametro que va recibir lo convierte en una cadena*/
    const newprov = JSON.stringify(proveedor);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.provsURL, newprov, {headers})
    .pipe(map( (res => {
      return res;
    })));
  }

  /** ----------------------- METODO GET - READ -------------------------*/
  getProvedores() {
    return this.http.get(this.provsURL)
    .pipe(map( res => res));
  }

  /** --------------- METODO PUT - UPLOAD ----------------------------- */
  /** traer el provedor especifico con id */
  getProveedor(id$: string) {
    /** url/id_seleccionado.json */
    const url = `${this.provURL}/${id$}.json`;
    return this.http.get(url).pipe(map(res => res));
  }


  putProveedor(proveedor: any, id$: string) {
    const newprov = JSON.stringify(proveedor);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.provURL}/${id$}.json`;

    return this.http.put(url, newprov, {headers}).pipe(
      map( res => {
        return(res);
      })
    );
  }

  /**--------------------------- METODO DELETE -----------------------------------*/
  delProveedor(id$: string) {

    const url = `${this.provURL}/${id$}.json`;
    console.log(url);
    return this.http.delete(url).pipe(map(res => res));
  }
}
