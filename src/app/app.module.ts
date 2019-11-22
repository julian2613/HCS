import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MaestroComponent } from './components/maestro/maestro.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { AseguradoraComponent } from './components/aseguradora/aseguradora.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapfreComponent } from './components/mapfre/mapfre.component';
import { FormsService } from './services/forms/forms.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';
import { PymesComponent } from './components/pymes/pymes.component';
import { DatosClienteComponent } from './components/datos-cliente/datos-cliente.component';
import { DatosRiesgoComponent } from './components/datos-riesgo/datos-riesgo.component';
import { TarjetaUsuarioComponent } from './components/tarjeta-usuario/tarjeta-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MaestroComponent,
    AseguradoraComponent,
    MapfreComponent,
    PropiedadesComponent,
    PymesComponent,
    DatosClienteComponent,
    DatosRiesgoComponent,
    TarjetaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPageScrollCoreModule.forRoot({duration: 500})
  ],
  providers: [
    FormsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
