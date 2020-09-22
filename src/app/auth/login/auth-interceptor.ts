import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UserService} from '../../user/user.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{



  constructor(private AuthService:UserService ){}

  intercept(req:HttpRequest<any>,next:HttpHandler){              //angular will call this method for requests that will be living the app

            const authToken = this.AuthService.getToken();
            if(authToken !== null){
              const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
              const authrequest = req.clone({
                headers:headers, responseType: 'text' as 'json' }

              )
              return next.handle(authrequest);
            }

            else{

              const authrequest = req;
              return next.handle(authrequest);

            }

      }
}

