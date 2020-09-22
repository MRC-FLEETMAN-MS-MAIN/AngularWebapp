import { Iactivity } from './activity.model';

export const SAVED_ACTIVITIES: Iactivity[] = [
  {
    "id": 1,
    "name": "Road Trip to Dortmund",
    "date": new Date('06/01/2017'),
    "comments": "Wunderbar tag",
    "distance": 6.2,
    "gpxData": "../../assets/gpx/1.gpx"
  },

  {
    "id": 2,
    "name": "Road Trip to Southampton",
    "date": new Date('06/01/2018'),
    "comments": "Wunderbar tag bei UK",
    "distance": 6.9,
    "gpxData": "../../assets/gpx/2.gpx"
  }
]
