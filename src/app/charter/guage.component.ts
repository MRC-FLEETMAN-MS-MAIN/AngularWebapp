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
  preso:Number = null;
  datetime:string = "";

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


 var allchart = new Chart("allchart", {
   type: 'doughnut',
   data: {
      // labels: ['Completed', 'Loading'],
      labels: ['Pascals'],
       datasets: [{
           label: 'Pressure stats',
           data: [23, 77],
           backgroundColor: ['blue','red'],
           borderColor: ['blue','red'],
           borderWidth: 1
       }]
   },
   options: {
     // legend:{
    //    display:false
    //  },
       circumference: 2*Math.PI,
       rotation: 2*Math.PI,
       cutoutPercentage: 50
   }
});


var motchart = new Chart("motchart", {
 type: 'doughnut',
 data: {
    // labels: ['Completed', 'Loading'],
    labels: ['Motion'],
     datasets: [{
         label: 'Motion stats',
         data: [0, 1],
         backgroundColor: ['blue','red'],
         borderColor: ['blue','red'],
         borderWidth: 1
     }]
 },
 options: {
   // legend:{
  //    display:false
  //  },
     circumference: 2*Math.PI,
     rotation: 2*Math.PI,
     cutoutPercentage: 50
 }
});



var ctx = new Chart("ctx", {
 type: 'line',
 data: {
     labels: ['Red','Green','Yello','Test4','Test5'],
     datasets: [{
         label: 'Temperature Record Timings',
         data: [12,26,4,6,15] ,
         fill: false,
         borderColor: 'blue',
         borderWidth: 1,

     },
     {
       label: 'Pressure Record Timings',
       data: [16,3,32,22,16] ,
       fill: false,
       borderColor: 'green',
       borderWidth: 1,

   }]
 },
 options: {
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero: true
             }
         }]
     }
 }
});





/* setInterval(function(){


   let ab = Math.floor((Math.random() * 100) + 1);
   console.log("The random value is " + ab);
   myChart.data.datasets[0].data = [ab,100-ab];
   myChart.update();

   }, 3000);  */

   this.websocketservice.listen('motion').subscribe((data)=>{

     var dat = Number(data);
    // this.tempo = dat;
     motchart.data.datasets[0].data = [dat,1-dat];
     motchart.update();



   })

/*   this.websocketservice.listen('temperature').subscribe((data)=>{

     var dat = Number(data);
     this.tempo = dat;
     myChart.data.datasets[0].data = [dat,100-dat];
     myChart.update();



   })  */


   this.websocketservice.listen('pressuretemperature').subscribe((data)=>{
     var datarray = data.split(":");
     var datpre = Number(datarray[0]);
     var datemp = Number(datarray[1]);
     this.preso = datpre;
     this.tempo = datemp;
     this.datetime = datarray[2];
     allchart.data.datasets[0].data = [datpre,100-datpre];
     allchart.update();
     myChart.data.datasets[0].data = [datemp,100-datemp];
     myChart.update();
     if(ctx.data.labels.length >= 5){
       ctx.data.datasets[0].data.shift();
      ctx.data.datasets[1].data.shift();
     ctx.data.labels.shift();
     }
   //  ctx.data.datasets[0].data.shift();
   //  ctx.data.datasets[1].data.shift();
   //  ctx.data.labels.shift();
     ctx.data.datasets[0].data.push(this.tempo);
     ctx.data.datasets[1].data.push(this.preso);
     ctx.data.labels.push(this.datetime)
     ctx.update()

     console.log(data);


   })
/*
   this.websocketservice.listen('datetime').subscribe((data)=>{

     var dat = data.toString();
     this.datetime = dat;




   }) */


   function updatechart(){
         ctx.data.datasets[0].data.shift();
         ctx.data.datasets[1].data.shift();
         ctx.data.labels.shift();
         ctx.data.datasets[0].data.push(this.tempo);
         ctx.data.datasets[1].data.push(this.preso);
         ctx.data.labels.push(this.datetime)
         ctx.update()
   }


   setInterval(()=>{



     updatechart();

    },3000)






 }





}
