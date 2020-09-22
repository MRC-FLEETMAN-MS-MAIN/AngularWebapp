import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../user/user.service';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit,OnDestroy{

 constructor(private userservice: UserService){}

 private authlistenersubsc : Subscription;
 userIsAuthenticated = false;

 ngOnInit(){

  this.userIsAuthenticated = this.userservice.getauthstatus();
     this.authlistenersubsc = this.userservice.getAuthStatusListener().subscribe(isauth=>{
             this.userIsAuthenticated = isauth;
     });
 }

 ngOnDestroy(){
  this.authlistenersubsc.unsubscribe();
 }

 onLogout(){
  this.userservice.logout();
 }


}



