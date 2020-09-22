import {Injectable} from '@angular/core'
import {HttpClient,HttpHeaders} from "@angular/common/http"
import {Router} from "@angular/router";
import { User } from "../model/user.model";
import { UserMo } from "../model/user.model";
import { Login } from "../model/login.model";
import { UserResponse } from "../model/userresponse";
import {map, timeInterval} from 'rxjs/operators'

import {Subject} from 'rxjs';


@Injectable({providedIn:"root"})
export class UserService{

  private token:string;
  isauthenticated:boolean = false;

  private users:UserResponse[] = [];
  private usersupdated = new Subject<{users:UserResponse[]}>();
  private authStatusListener = new Subject<boolean>();
  private vacantarray:any[] = [];
  private tokentimer: any;

  constructor(private http:HttpClient, private router:Router){}

  getToken(){
    return this.token;
  }


  addUsers(first:string,lastname:string,password:string,email:string){

    const postData:UserMo =  {userName:lastname,password:password,email:email};


    //this.http.post<UserResponse>("http://localhost:8085/rest/publish/createuser",postData).subscribe((res)=>{

    console.log(postData);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      }), responseType: 'text' as 'json'
    };

     // this.http.post<UserResponse>("http://localhost:8011/user-microservice/user",postData,httpOptions).subscribe((res)=>{

      this.http.post<UserResponse>("http://34.195.41.137:8011/user-microservice/",postData,httpOptions).subscribe((res)=>{
           console.log(res);
           this.router.navigate(["/login"]);

    })


  }

  loginuser(email:string,password:string){

    const loginData:Login =  {userName:email,password:password};
    console.log(loginData);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        "cache-control": "no-cache"
      })
    };

     // this.http.post<UserResponse>("http://localhost:8011/user-microservice/user",postData,httpOptions).subscribe((res)=>{

      this.http.post<any>("http://34.195.41.137:8011/user-microservice/authenticate",loginData,{ responseType: 'text' as 'json' }).subscribe((res)=>{
      const arr = res.split(" ");
      this.token = arr[0];
      if(this.token){
        const time = Number(arr[1]);
        this.setofftimer(time);

      //console.log("THE TIME OF EXPIRY OF TOKEN IS  " + time);
      this.authStatusListener.next(true);
      this.isauthenticated = true;
      //tokenconsole.log("THE TOKEN IS " + res);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + time);
      console.log("The expiration date is " + expirationDate);
      this.saveAuthData(this.token,expirationDate)
      this.router.navigate(["/view"]);

      }

    })


  }




  //return this.httpClient.get<string>("http://localhost:8011/user-microservice/", {headers, responseType: 'text' as 'json' });

  fetchUsers(){


    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    this.http.get<any>("http://34.195.41.137:8011/user-microservice/authenticate",{headers})
    .pipe(map((fetchData)=>{
      return {
        users: fetchData.map((each)=>{
          return ({
            userName: each.username,
            id: each.id,
            email: each.email,


          })
        })
      }
    }))
    .subscribe((transformedata)=>{
      console.log(transformedata);
      this.users = transformedata.users;
      this.usersupdated.next({users: [...this.users]});
    });
  }

  getUserUpdateListener(){
    return this.usersupdated.asObservable();
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getauthstatus(){
    return this.isauthenticated;
  }

  logout(){
    this.token=null;
    this.authStatusListener.next(false);
    this.isauthenticated=false;
    clearTimeout(this.tokentimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  autoAuthUser(){
    const authinfo = this.getAuthData();
    console.log("Autoauthinfo data is " + authinfo);
    if(!authinfo){
      return;
    }
    const now = new Date();
    const infutureexpires = authinfo.expirationDate.getTime() - now.getTime();
    console.log("DATE entered")
    if(infutureexpires > 0){
      this.token = authinfo.token;
      this.authStatusListener.next(true);
      this.isauthenticated = true;
      this.setofftimer(infutureexpires);


    }
  }

  private setofftimer(duration:number){

    this.tokentimer = setTimeout(()=>{
      this.logout();
   },duration);

  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expiratdate = localStorage.getItem("expiration");

    if(!token || !expiratdate){
      return;
    }

    return {token:token, expirationDate:new Date(expiratdate)}
  }



  private saveAuthData(token: string, expirationdate: Date){
     localStorage.setItem('token',token);
     localStorage.setItem('expiration',expirationdate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }



}
