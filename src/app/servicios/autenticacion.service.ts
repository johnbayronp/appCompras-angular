import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor() { }

  /** Creamos la autenticacion de la libreria de firebase.
   *  pasamos los datos guardados desde el componente registro, la variable userdate
   */
  registroUsuario(userdata) {
    firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password)
            .catch(error => {
              console.log(error);
            });
  }
}
