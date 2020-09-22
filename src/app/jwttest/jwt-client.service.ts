import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private httpClient: HttpClient, private userservice:UserService) { }


  public generateToken(request) {
    return this.httpClient.post<string>("http://localhost:9192/authenticate", request, {  responseType: 'text' as 'json' });
  }


  public welcome(token) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<string>("http://localhost:9192/", {headers, responseType: 'text' as 'json' });
  }

  public welcomesec(){

    let token = 'Bearer ' + this.userservice.getToken();
    const headers = new HttpHeaders().set('Authorization', token);
    return this.httpClient.get<string>("http://localhost:8011/user-microservice/", {headers, responseType: 'text' as 'json' });


  }
}
