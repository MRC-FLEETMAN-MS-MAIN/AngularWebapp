import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

  private mode = 'create';

  constructor(public userservice:UserService){

  }

  onLogin(form: NgForm){

      if(form.invalid){
        return;
      }

      if(this.mode=='create'){
              this.userservice.addUsers(form.value.firstname,form.value.lastname,form.value.password,form.value.email)
      }

      else{

      }

    // form.reset();  to be activated later

  }

/*
  clicko(){
    this.userservice.fetchUsers();
  }  */

}
