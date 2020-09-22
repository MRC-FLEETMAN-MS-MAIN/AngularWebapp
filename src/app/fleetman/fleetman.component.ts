import { Component, OnInit,OnDestroy } from '@angular/core';
import { FleetmanService } from './fleetman.service';
import { BehaviorSubject,Subscription } from 'rxjs';




@Component({
  selector: 'app-fleetman',
  templateUrl: './fleetman.component.html',
  styleUrls: ['./fleetman.component.css']
})



export class FleetmanComponent implements OnInit,OnDestroy {


  vehicle:string;
  subject = new BehaviorSubject({lat:53.291488, longitude: -1.639283});
  private fleetmansubscription : Subscription;
  private vehiclesubscription : Subscription;

  constructor(private fservice:FleetmanService){}

  latitude:Number = null;
  longitude:Number = null;


  ngOnInit(){


    this.vehiclesubscription = this.fservice.getVehicleUpdateListener().subscribe(res=>{
      this.vehicle=res;
    })



     this.fleetmansubscription = this.fservice.getFleetmanUpdateListener().subscribe(res=>{
      // console.log(res);
      this.latitude= res.lat;
      this.longitude = res.longitude;
     })
  }


  ngOnDestroy(){
    this.fleetmansubscription.unsubscribe();
    this.vehiclesubscription.unsubscribe();
  }

/*
  load(){
    this.fservice.getmappoints().subscribe((res)=>{
      // console.log(res);
      this.latitude= res.lat;
      this.longitude = res.longitude;
      console.log(this.latitude,this.longitude)
     })
  }  */

  loadMappoints(){

    this.fservice.getmappoints().subscribe((res)=>{
      //console.log(res);
      this.subject.next(res);
    })

  }



}
