import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'guage-user',
  templateUrl: './guage.component.html',
  styleUrls: ['./guage.component.css']
})

export class GuageComponent implements OnInit {

  tempo:Number = null;

  constructor(private websocketservice:WebSocketService){


  }



  ngOnInit(){
     var myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
         // labels: ['Completed', 'Loading'],
         labels: ['Celsius'],
          datasets: [{
              label: 'Temperature stats',
              data: [23, 77],
              backgroundColor: ['green','red'],
              borderColor: ['green','red'],
              borderWidth: 1
          }]
      },
      options: {
        // legend:{
       //    display:false
       //  },
          circumference: Math.PI,
          rotation: Math.PI,
          cutoutPercentage: 90
      }
  });


 /* setInterval(function(){


    let ab = Math.floor((Math.random() * 100) + 1);
    console.log("The random value is " + ab);
    myChart.data.datasets[0].data = [ab,100-ab];
    myChart.update();

    }, 3000);  */

    this.websocketservice.listen('temperature').subscribe((data)=>{
      var dat = Number(data);
      this.tempo = dat;
      myChart.data.datasets[0].data = [dat,100-dat];
      myChart.update();
    })

  }


}
