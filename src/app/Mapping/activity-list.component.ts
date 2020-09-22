import { Component, OnInit } from '@angular/core';
import { ActivityService } from './services/activity.service';
import { Iactivity } from './activity.model';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})


export class ActivityListComponent implements OnInit {

  activities: Iactivity[];
  totalActivities: number;
  totalDistance: number;
  //firstDate: Date;

  constructor(private activityService: ActivityService){}

  ngOnInit(){
    this.activities = this.activityService.getActivities();
    this.totalActivities = this.activityService.getTotalActivities(this.activities);
    this.totalDistance = this.activityService.getTotalDistance(this.activities);

  }
}
