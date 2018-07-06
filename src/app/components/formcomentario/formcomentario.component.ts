import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { UserService } from '../../services/user.service';
import { ComentarioService } from '../../services/comentario.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Comentario } from '../../models/comentario';
import { GLOBAL } from '../../services/global';
declare var $: any;

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-formcomentario',
  templateUrl: './formcomentario.component.html',
  styleUrls: ['./formcomentario.component.css'],
  providers: [UserService, RestaurantService, ComentarioService]

})
export class FormcomentarioComponent implements OnInit {
  tipoControl = new FormControl([Validators.required]);
  tipos = [
    { name: 'Mala', valor: 2.5 },
    { name: 'Regular', valor: 5 },
    { name: 'Buena', valor: 7.5 },
    { name: 'Excelente', valor: 10 },
  ];

  public imagenTemp: String;
  public url: String;
  public identity;
  public token: string;
  public comentario: Comentario;

  public _idRestaurant: String;
  public _idUser: String;

  constructor(private _comentarioService: ComentarioService,
    private _restaurantService: RestaurantService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    // this.comentario = new Comentario('', '', 0, 0, 0, 0, '', '', '');
  }

  ngOnInit() {
    this.getRestaurantUrl();
  }

  upPropuesta() {
    // let id = this.propuesta.evento;
    // this._router.navigate(['/etapa/' + id, 1]);
  }


  getRestaurantUrl() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      this._idRestaurant = id;
      this._idUser = this.identity._id;
      this.comentario = new Comentario('', '', 0, 0, 0, 0, '', this._idUser, this._idRestaurant);
    });
  }

  saveComentario() {
    console.log(this.comentario);
    this._comentarioService.saveComentario(this.token, this.comentario).subscribe(
      response => {
        console.log(response);
        if (!response.comentario) {
          swal('Lo sentimos', 'No se pudo registrar su comentario', 'warning');

        }  else {
          swal('Gracias por su comentario', 'Su comentario se guardo con exito', 'success');

          this._router.navigate(['/restaurant/' + response.comentario.restaurant]);
        }
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          console.log(error);
        }
      }
    );
  }

  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any, archivo: File) {
    this.filesToUpload = <Array<File>>fileInput.target.files;


    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      console.log(reader.result);

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
