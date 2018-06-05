import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl:'./menu.component.html',
  styleUrls:['./menu.component.css'],
  providers:[UserService]
})  

export class MenuComponent implements OnInit{
  public title = 'salir';
  public errorMessage;

	public identity;
  public token;
  public nameUser:String="Carlos";
    
  constructor(private _userService: UserService){
  }  
  
  ngOnInit(){ 
    // this.identity = this._userService.getIdentity();
    // this.token = this._userService.getToken();
    if(this.identity){
      this.nameUser=this.identity.name;
    }
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity=null;
    this.token=null;
    this.errorMessage=null;
  }
}
