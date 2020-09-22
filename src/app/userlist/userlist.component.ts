import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';
import { UserResponse } from '../model/userresponse';



import {Subscription} from 'rxjs';



@Component({
  selector: 'appuserlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})



export class UserListComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['userName', 'email'];
  dataSource = [];


  users:UserResponse[] = [];
  private usersubscription : Subscription;

  constructor(public userservice:UserService){}


  ngOnInit(){
      this.userservice.fetchUsers();
      this.usersubscription = this.userservice.getUserUpdateListener().subscribe((res)=>{
        this.users=res.users;
        console.log("The users list in component is" + this.users);
        this.dataSource = this.users;
      })

  }

  ngOnDestroy(){
    this.usersubscription.unsubscribe();
  }


}
