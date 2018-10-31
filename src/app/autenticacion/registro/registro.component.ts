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

  constructor(private formBuilder: FormBuilder,
              private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      'user': ['', [Validators.required, Validators.max(6)] ],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required,
        Validators.pattern('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,10}$/')]]
    });
  }

  onSubmit() {
    /** cuando presione enviar , se guardaran los datos en userdata
     */
    this.userdata = this.saveUserdata();

    this.autenticacionService.registroUsuario(this.userdata);
  }

  saveUserdata() {
    const saveUserdata = {
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value,
      user: this.registroForm.get('user').value
    };
    return saveUserdata;
  }

}
