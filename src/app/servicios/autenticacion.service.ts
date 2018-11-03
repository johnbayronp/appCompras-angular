import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private router: Router,
              private activateRoute: ActivatedRoute) { }

  /** Creamos la autenticacion de la libreria de firebase.
   *  pasamos los datos guardados desde el componente registro, la variable userdate
   */
  registroUsuario(userdata) {
    firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password)
            .catch(error => {
              console.log(error);
            });
  }

  /** Metodo de autenticacion de usuario registrado */
  loginUser(userdata) {
    firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password)
            .then(responseServe => {
              console.log(responseServe);
              this.router.navigate(['/viewpresupuesto']);
            }).catch(error => {
              console.log(error + ':Not found');

              });
  }

  /** Metodo determina si  el usuario esta conectado o no */
  isAutenticated() {
      const user = firebase.auth().currentUser;
      /** Si el usuario esta conectado True , Sino False */
      if (user) {
        return true;
      } else {
        return false;
      }
  }

  /** Metodo para el cierre de sesion */
  logOut() {
    firebase.auth().signOut();
  }

}
