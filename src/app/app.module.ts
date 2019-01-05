/** MODULES EXT */
import { FacturasModule } from './facturas/facturas.module';

/** CLASES  */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/** Importamos para peticiones POST | Mediante Http */
import { HttpClientModule } from '@angular/common/http';
/** Importamos angular firebase , para los archivos. */
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { enviroment } from './config/firebase.config';

/** SERVICIOS */
import { ProveedoresService } from './servicios/proveedores.service';
import { PresupuestoService } from './servicios/presupuesto.service';
import { AutenticacionService } from './servicios/autenticacion.service';
import { GuardService } from './servicios/guard.service';
import { LoadfileService } from './servicios/loadfile.service';
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
import { InisesComponent } from './autenticacion/inises/inises.component';
import { UploadComponent } from './uploads/upload/upload.component';
import { from } from 'rxjs';

/** otro modulo - facturas */
import { AddfacturaComponent } from './facturas/facturas/addfactura/addfactura.component';


/** RUTAS  */
/** Creamos las rutas cada una en formato document (json)*/
const routes: Routes = [
  /** path:'' *(raiz)* , component:*(Clase de component la misma de import)*
   * path: '**' cualquier ruta que no exista */
      { path: '',
        component: InicioComponent},
      { path: 'proveedores',
        component: ProveedoresComponent,
        canActivate: [GuardService] },
      { path: 'addproveedores',
        component: AddproveedoresComponent,
        canActivate: [GuardService] },
      { path: 'editpres/:id',
        component: EditComponent,
        canActivate: [GuardService] },
      { path: 'addpres',
        component: AddpresComponent,
        canActivate: [GuardService] },
      { path: 'viewpresupuesto',
        component: ViewpresupuestoComponent,
        canActivate: [GuardService]},
      { path: 'inises',
        component: InisesComponent},
      { path: 'registro',
        component: RegistroComponent},
      { path: 'addfact',
        component: AddfacturaComponent},
      { path: 'uploadFile',
        component: UploadComponent},
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
    RegistroComponent,
    InisesComponent,
    UploadComponent
  ],
  imports: [BrowserModule,
  /** Creamos RouterModule y pasamos las rutas (routes) */
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FacturasModule,
    /** inicializar nuestra db de firebase */
    AngularFireModule.initializeApp(enviroment),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [ProveedoresService, PresupuestoService, AutenticacionService, GuardService,
              LoadfileService],
  bootstrap: [AppComponent]
})
export class AppModule {}
