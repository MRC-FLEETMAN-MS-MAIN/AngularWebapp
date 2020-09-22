import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from '../Mapping/services/map.service';
import { Iactivity } from '../Mapping/activity.model';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'map-list',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {
  constructor(private mapService:MapService, private route:ActivatedRoute ){}

  activity:any;
  activityName:string;
  activityComments:string;
  activityDate:Date;
  activityDistance:number;
  gpx:any;

  ngOnInit(){

    this.activity = this.mapService.getActivity(+this.route.snapshot.params['id']);

    this.mapService.plotActivity(+this.route.snapshot.params['id']);
    this.activityName = this.activity.name;
    this.activityComments = this.activity.comments;
    this.activityDistance = this.activity.distance;
    this.activityDate = this.activity.date;
    this.gpx = this.activity.gpxData;

  }


}
