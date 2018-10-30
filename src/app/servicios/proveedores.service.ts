import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  proveedores: any = [
    {
      id: 1,
      nombre: 'John perez',
      telefono: 3184826845,
      ciudad: 'Medellin',
      email: 'webdeprueba1.1@gmail.com',
      nacionalidad: 'Colombiano',
      empresa: 'Bapesu S.A'
    },
    {
      id: 2,
      nombre: 'Daniel Navarro',
      telefono: 3143928342,
      ciudad: 'Medellin',
      email: 'danvaram@gmail.com',
      nacionalidad: 'Colombiano',
      empresa: 'Envios Express S.A'
    },
    {
      id: 3,
      nombre: 'Julian David',
      telefono: 3143928342,
      ciudad: 'Medellin',
      email: 'davidjulian@profilelighting.com',
      nacionalidad: 'Colombiano',
      empresa: 'Profile Lighting Colombia'
    }
  ];

  constructor() {
  }

  /** Creamos el metodo() donde enviaremos el mensaje desde el servicio*/
  getProveedores() {
    /** En el metodo de proveedores vamos a tener el array de proveedores */
    return this.proveedores;
  }


}
