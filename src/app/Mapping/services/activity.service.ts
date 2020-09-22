import {Injectable} from '@angular/core'
import { SAVED_ACTIVITIES } from '../activities';
import { Iactivity } from '../activity.model';

@Injectable()
export class ActivityService{

  constructor(){}


  getActivities(): Iactivity[]{
    return SAVED_ACTIVITIES.slice(0);
  }

  getTotalActivities(allActivities: Iactivity[]){
    return allActivities.length;
  }

  getTotalDistance(allActivities: Iactivity[]){
    var TotalDistance = 0;
    for(var i =0; i< allActivities.length;i++){
      TotalDistance += allActivities[i].distance;
    }
    return TotalDistance;
  }







}
