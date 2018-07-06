import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
// import swal from 'sweetalert';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  public identity;
  public token;
  public user: User;

  constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) {
    this.user = new User('', '', '', '', '', '', '', '', '','','');
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.getUser();
  }

  public getUser() {
    console.log(this.identity);
    this._userService.getUser(this.token, this.identity._id).subscribe(
      response => {
        if (!response.user) {
          console.log('No existe usuario');
        } else {
              this.user = response.user;
        }
      },
      error => {

      }
    );
  }

  public updateUser() {
    this._userService.updateUser(this.token, this.identity._id, this.user).subscribe(
      response => {
        if (!response.user) {
          swal('Lo sentimos', 'Los datos no fueron modificados con exito', 'warning');
        } else {
          swal('Perfil modificado', 'Sus datos fueron modificados con exito', 'success');
          this.identity=response.user;

          this._userService.guardarStorage(this.identity._id, this.token, this.identity);

        }
      },
      error => {

      }
    );
  }


}
