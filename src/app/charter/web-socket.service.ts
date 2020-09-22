import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService{

  socket:any;

  constructor(){
    this.socket = io.connect('http://3.233.132.93:3002');

}

listen(eventname:string):Observable<any>{
  return new Observable((sub)=>{
    this.socket.on(eventname,(data)=>{
      sub.next(data);
    })
  })
}

}
