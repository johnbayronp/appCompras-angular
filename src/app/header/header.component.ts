import { Component, OnInit } from '@angular/core';

/** Importada */
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  isAuten() {
    return this.autenticacionService.isAutenticated();
  }

  loginOut() {
    this.autenticacionService.logOut();
    this.router.navigate(['/registro']);
  }
}
