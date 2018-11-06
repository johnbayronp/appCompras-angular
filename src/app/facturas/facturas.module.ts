import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddfacturaComponent } from './facturas/addfactura/addfactura.component';

/**CLASES DE MODULO RAIZ */
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule , Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/** Importamos para peticiones POST | Mediante Http */
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [AddfacturaComponent]
})
export class FacturasModule { }
