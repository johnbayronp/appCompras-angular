/** CLASES  */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/** Importamos para peticiones POST | Mediante Http */
import { HttpClientModule } from '@angular/common/http';

/** SERVICIOS */
import { ProveedoresService } from './servicios/proveedores.service';
import { PresupuestoService } from './servicios/presupuesto.service';
import { AutenticacionService } from './servicios/autenticacion.service';

/** COMPONENTES */

import { AppComponent } from './app.component';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { AddproveedoresComponent } from './proveedores/addproveedores/addproveedores.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { AddpresComponent } from './presupuesto/addpres/addpres.component';
import { ViewpresupuestoComponent } from './presupuesto/viewpresupuesto/viewpresupuesto.component';
import { EditComponent } from './presupuesto/edit/edit.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';


/** RUTAS  */
/** Creamos las rutas cada una en formato document (json)*/
const routes: Routes = [
  /** path:'' *(raiz)* , component:*(Clase de component la misma de import)*
   * path: '**' cualquier ruta que no exista */
      { path: '',
        component: InicioComponent },
      { path: 'proveedores',
        component: ProveedoresComponent },
      { path: 'addproveedores',
        component: AddproveedoresComponent },
      { path: 'editpres/:id',
        component: EditComponent },
      { path: 'addpres',
        component: AddpresComponent },
      { path: 'viewpresupuesto',
        component: ViewpresupuestoComponent},
      { path: 'registro',
        component: RegistroComponent},
      { path: '**',
        component: InicioComponent },
    ];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
    AddproveedoresComponent,
    CopyrightComponent,
    AddpresComponent,
    ViewpresupuestoComponent,
    EditComponent,
    RegistroComponent
  ],
  imports: [
  BrowserModule,
    /** Creamos RouterModule y pasamos las rutas (routes) */
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProveedoresService, PresupuestoService, AutenticacionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
