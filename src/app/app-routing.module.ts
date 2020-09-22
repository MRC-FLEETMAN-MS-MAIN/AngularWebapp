import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../app/user/user.component';
import { UserListComponent } from '../app/userlist/userlist.component';
import { GuageComponent } from '../app/charter/guage.component';
import { ActivityListComponent } from '../app/Mapping/activity-list.component';
import { MapComponent } from '../app/Mapping/map.component';
import { FleetmanComponent } from './fleetman/fleetman.component';
import { LoginComponent } from './auth/login/login.component';
import { SecurityComponent} from './jwttest/security/security.component';
import {UserGuard} from './user/user.guard';

const routes: Routes = [{path: '', component: UserComponent},
{path: 'view', component: UserListComponent, canActivate: [UserGuard]},{path: 'charter', component: GuageComponent, canActivate: [UserGuard]},
{path: 'mapping', component: ActivityListComponent, canActivate: [UserGuard]},{ path: "run/:id", component: MapComponent, canActivate: [UserGuard] },
{ path: "fleetman", component: FleetmanComponent, canActivate: [UserGuard] }, {path: "login", component:LoginComponent},
{path: "test", component:SecurityComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserGuard]
})
export class AppRoutingModule { }


