import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})
export class InisesComponent implements OnInit {

  loginForm: FormGroup;
  userdata: any;
  /** Declaramos la variable mensaje false que tendra accion con el texto de alerta de 
   * usuario no registrado.
   */
  mensaje = false;
  reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  autenticando = false;
  /** FormBuilder (Contruye el formulario con group),
   * autenticacionService( es el servicio de las autenticacion de registro ),
   * Router(permite el acceso a otras paginas mediante el header),
   * ActivatedRoute(es el complemento que activa el router)
   */
  constructor(private formBuilder: FormBuilder,
              private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRouter: ActivatedRoute ) { }

  ngOnInit() {
    /** Validaciones */
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(this.reg)]]
    });

  }

  onSubmit() {
    /** cuando presione enviar , se guardaran los datos en userdata
     */

    this.autenticando = true;
    this.userdata = this.saveUserdata();
    this.autenticacionService.loginUser(this.userdata);
    /** Tiempo de respuesta para el servidor en responder */
    setTimeout(() => {
      if (this.isAuten() === false) {
        this.mensaje = true;
      }
      this.autenticando = false;
    }, 2000);
  }

  /** Guardar nuestros datos del usuario en la variable  saveUserdata */
  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    return saveUserdata;
  }

  /** Trae del servidor si el usuario esta registrado o no con FALSE o TRUE*/
  isAuten() {
    return this.autenticacionService.isAutenticated();
  }

}
