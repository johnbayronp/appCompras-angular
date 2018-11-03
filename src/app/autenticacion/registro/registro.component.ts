import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';

import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  userdata: any;
  /** validacion de password (expresion regular ) */
  reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  erroresForm = {
    'user': '',
    'email': '',
    'password': ''
  };

  /**  Si existe un error en el formulario asignar un mensaje de validacion para el usuario */
  mensajeValidacion = {
    'user': {
      'required': 'Usuario es obligatorio',
      'minlength': 'El usuario debe tener como minimo 6 caracteres'
    },
    'email': {
      'required': 'Email obligatorio',
      'email': 'Introduzca un email valido ex: micorreo@gmail.com'
    },
    'password': {
      'required': 'Contraseña obligatoria',
      'pattern': 'La contraseña debe tener minimo un numero , una letra y un caracter'
    }
  };



  constructor(private formBuilder: FormBuilder,
              private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      'user': ['', [Validators.required, Validators.minLength(6)] ],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(this.reg)]]
    });

   /** mandamos los cambios realizados en real-time para validarlos iterando los campos de erroresForm y mensajeValidacion */
    this.registroForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onSubmit() {
    /** cuando presione enviar , se guardaran los datos en userdata
     */
    this.userdata = this.saveUserdata();

    this.autenticacionService.registroUsuario(this.userdata);

    this.router.navigate(['/**']);
  }

  /** Guardar nuestros datos del usuario en la variable  saveUserdata */
  saveUserdata() {
    const saveUserdata = {
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value,
      user: this.registroForm.get('user').value
    };
    return saveUserdata;
  }

  /** Metodo javascript para captar los errores en el formulario */
  onValueChanged(data?: any) {
    if (!this.registroForm) { return; }
    const form =  this.registroForm;

    for (const field in this.erroresForm) {
      this.erroresForm[field] = '';     /** erroresForm[field] , ex:  */

      const control = form.get(field); /** obtener valor el campo en el formulario*/
      
      if(control && control.dirty && !control.valid){
        const message = this.mensajeValidacion[field]; /** traer el mensaje dependiendo al campo donde este  */
        
        for(const key in control.errors){
          this.erroresForm[field] += message[key] + '';
        } 
      }
    }

  }

}
