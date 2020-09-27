import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/header/header.component';
import { UserComponent } from '../app/user/user.component';
import { FormsModule } from '@angular/forms';

import { ActivityService } from '../app/Mapping/services/activity.service';
import { MapService } from '../app/Mapping/services/map.service';
import { UserService } from "./user/user.service";
import { WebSocketService } from "../app/charter/web-socket.service"
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import { UserListComponent } from '../app/userlist/userlist.component';
import { GuageComponent } from '../app/charter/guage.component';
import { ActivityListComponent } from '../app/Mapping/activity-list.component';
import { MapComponent } from '../app/Mapping/map.component';
import { AgmCoreModule } from '@agm/core';
import { FleetmanComponent } from './fleetman/fleetman.component';

import { LoginComponent } from './auth/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';


import { FleetmanService } from './fleetman/fleetman.service';

import {JwtClientService} from '../app/jwttest/jwt-client.service';
import {SecurityComponent} from '../app/jwttest/security/security.component';



import {AuthInterceptor} from './auth/login/auth-interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    UserListComponent,
    GuageComponent,
    ActivityListComponent,
    MapComponent,
    FleetmanComponent,
    LoginComponent,
    SecurityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMC1e848W2FNZ97w6Q116iAYUc1MF9bOc'
    })

  ],
  providers: [UserService,WebSocketService,ActivityService,MapService,FleetmanService,JwtClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }

AuthInterceptor

//,{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi: true}
