import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArgumentType } from '@angular/compiler/src/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [UserService]
})

export class MenuComponent implements OnInit {
  public title = 'salir';
  public errorMessage;

  public identity;
  public token;
  public nameUser: String;

  constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if (this.identity) {
      this.nameUser = this.identity.name;
    }
  }

  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.errorMessage = null;
  }

}
