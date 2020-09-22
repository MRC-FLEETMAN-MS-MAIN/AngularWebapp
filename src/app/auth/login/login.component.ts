import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'login-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  //private mode = 'create';

  constructor(public userservice:UserService){

  }

  onLogin(form: NgForm){

      if(form.invalid){
        return;
      }

      this.userservice.loginuser(form.value.email,form.value.password);



    // form.reset();  to be activated later

  }

/*
  clicko(){
    this.userservice.fetchUsers();
  }  */

}
