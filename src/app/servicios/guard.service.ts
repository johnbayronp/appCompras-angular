/** Servicio para proteger las rutas de los usuarios no registrados  */
import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';

import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
/** implementamos canactivate porque es una interfaz */
export class GuardService implements CanActivate {

  constructor(private autenticacionService: AutenticacionService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    /** para saber si se ha iniciado sesion en la aplicacion o ono */
    return this.autenticacionService.isAutenticated();
  }
}
