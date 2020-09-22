import { Component, OnInit } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  authRequest:any={
    "userName":"tovino",
    "password":"Rooney@11"
  };

  response:any;

  constructor(private service:JwtClientService) { }

  ngOnInit() {
    //this.getAccessToken(this.authRequest);
    this.accessapitry();
  }

  public getAccessToken(authRequest){
let resp=this.service.generateToken(authRequest);
resp.subscribe(data=>this.accessApi(data));
  }


  public accessApi(token){
let resp=this.service.welcome(token);
resp.subscribe(data=>this.response=data);
  }

  public accessapitry(){
    let resp=this.service.welcomesec();
resp.subscribe(data=>this.response=data);
  }
}
