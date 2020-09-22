import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import {UserService} from './user/user.service';
import {FleetmanService} from './fleetman/fleetman.service';


@Component({
  selector: 'app-root',
  templateUrl: './app1.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{



  constructor(private userservice:UserService, private fleetmanservice:FleetmanService){}


  title = 'micro1';

  ngOnInit(){


       this.userservice.autoAuthUser();
       setInterval(()=>{

        this.fleetmanservice.loadMappoints();
        this.fleetmanservice.getvehicletracked();
       },300)

  }






}
