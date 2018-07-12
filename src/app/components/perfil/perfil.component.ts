import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
// import swal from 'sweetalert';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { GLOBAL } from '../../services/global';
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
  public imagenTemp: String;
  public url: String;

  constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) {
    this.user = new User('', '', '', '', '', '', '', '', '', '', '', '');
    this.url = GLOBAL.url;
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
          this.identity = response.user;

          this._userService.guardarStorage(this.identity._id, this.token, this.identity);

        }
      },
      error => {

      }
    );
  }

  public updateUserImg() {

    console.log(this.url, "assa");

    this.makeFileRequest(this.url + 'upload-img-usuario/' + this.identity._id, [],
      this.filesToUpload).then(
        (result) => {

          swal('Imagen modificada', 'La imagen de perfil se modifico con exito', 'success');
        },
        (error) => {
          console.log(error);
        }
      );

  }



  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any, archivo: File) {
    this.filesToUpload = <Array<File>>fileInput.target.files;


    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {

      this.imagenTemp = reader.result;
    };

  }


  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    var token = this.token;

    return new Promise(function (resolve, reject) {
      var formData: any = new FormData;
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append('imagen', files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });

  }

}
