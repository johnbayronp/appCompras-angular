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
  mensaje = false;
  reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

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
    this.userdata = this.saveUserdata();
    this.autenticacionService.loginUser(this.userdata);
  }

  /** Guardar nuestros datos del usuario en la variable  saveUserdata */
  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    return saveUserdata;
  }

  /** si el usuario no esta registrado , mensaje  lo declaramos como falso S*/
  isAuten() {
    const res = this.autenticacionService.isAutenticated();
    if (res === this.mensaje) {
      return true;
    }
  }

}
