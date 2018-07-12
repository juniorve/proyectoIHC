import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Restaurant } from '../../models/restaurant';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../models/comentario';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Imagen } from '../../models/imagen';
import { ImagenService } from '../../services/image.service';
import { GLOBAL } from '../../services/global';
import { PlatilloService } from '../../services/platillo.service';
import { Platillo } from '../../models/platillo';
const swal: SweetAlert = _swal as any;
declare var $: any;
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers: [RestaurantService, ComentarioService, ImagenService,PlatilloService]
})
export class RestaurantComponent implements OnInit {
  token: string;
  usuario: any;
  restaurantId: string;
  restaurant: Restaurant;
  public bandera: boolean = false;
  public imagen: Imagen;
  public comentarios: Comentario[] = [];
  promedio: any = 0;
  public cantidad: number;
  public imagenTemp: String;
  public url;
  public platillos:any;
  public imagenes: Imagen[] = [];
  public platillo:Platillo;

  constructor(private _restaurantService: RestaurantService,
    private _platilloService:PlatilloService,
    private _userService: UserService,
    private _imagenService: ImagenService,
    private _route: ActivatedRoute,
    private _comentarioService: ComentarioService,
    private _router: Router) {
    this.token = this._userService.getToken();
    this.usuario = this._userService.getIdentity();
    this.restaurant = new Restaurant('', '', '', '', '', '', '', '');
    // this.platillo= new Platillo('','','');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getRestaurantUrl();
    this.getRestaurant();
    this.dropdown();
    this.getPlatilloxRestaurant();
  }



  savePlatillo() {
    console.log(this.platillo);
    this._platilloService.savePlatillo(this.token, this.platillo).subscribe(
      response => {
        console.log(response);
        if (!response.platillo) {
          swal('Lo sentimos', 'No se pudo registrar su platillo', 'warning');

        } else {

          this.makeFileRequest(this.url + 'upload-img-platillo/' + response.platillo._id, [],
            this.filesToUpload).then(
              (result) => {
      this.platillo = new Platillo('', this.usuario._id, this.restaurantId);
      this.imagenTemp="";

                swal('Platillo del mes registradp', 'El platillo se guardo correctamente', 'success');
                this.getPlatilloxRestaurant();
              },
              (error) => {
                console.log(error);
              }
            );

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



  getPlatilloxRestaurant() {
    console.log(this.restaurantId);
    this._platilloService.getPlatilloxRestaurant(this.token, this.restaurantId).subscribe(
      response => {
        if (!response.platillos) {
        } else {
          this.platillos = response.platillos[0];
          console.log(this.platillos);
        }},
        error => {

        });
  }




  getImagenesxRestaurant() {
    console.log(this.restaurantId);
    this._imagenService.getImagenesxRestaurant(this.token, this.restaurantId).subscribe(
      response => {
        if (!response.imagenes) {
        } else {
          this.imagenes = response.imagenes;
          console.log(response.imagenes);
        }},
        error => {

        });
  }


  saveImagen() {
    console.log(this.imagen);
    this._imagenService.saveImagen(this.token, this.imagen).subscribe(
      response => {
        console.log(response);
        if (!response.imagen) {
          swal('Lo sentimos', 'No se pudo registrar su imagen', 'warning');

        } else {

          this.makeFileRequest(this.url + 'upload-img-imagen/' + response.imagen._id, [],
            this.filesToUpload).then(
              (result) => {
      this.imagen = new Imagen('', '', '', this.usuario._id, this.restaurantId);
      this.imagenTemp="";

                swal('Imagen registrada', 'La imagen se guardo correctamente', 'success');
                this.getImagenesxRestaurant();
              },
              (error) => {
                console.log(error);
              }
            );

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


  dropdown() {
    var options = [];

    $('.dropdown-menu a').on('click', function (event) {

      var $target = $(event.currentTarget),
        val = $target.attr('data-value'),
        $inp = $target.find('input'),
        idx;

      if ((idx = options.indexOf(val)) > -1) {
        options.splice(idx, 1);
        setTimeout(function () { $inp.prop('checked', false) }, 0);
      } else {
        options.push(val);
        setTimeout(function () { $inp.prop('checked', true) }, 0);
      }

      $(event.target).blur();

      console.log(options);
      return false;
    });
  }

  upComentario(idRestaurant: String) {
    this._router.navigate(['/formcomentario/' + this.restaurantId]);
  }


  getRestaurantUrl() {
    this._route.params.forEach((params: Params) => {
      if (params['id']) {
        this.restaurantId = params['id'];
      }
      this.imagen = new Imagen('', '', '', this.usuario._id, this.restaurantId);
      this.platillo = new Platillo('', this.usuario._id, this.restaurantId);

      this.getImagenesxRestaurant();

    });
  }


  getRestaurant() {
    this._restaurantService.getRestaurant(this.token, this.restaurantId).subscribe(
      response => {
        if (!response.restaurant) {
        } else {
          this.restaurant = response.restaurant;
          // console.log(this.restaurant);
          this.getComentariosxPropuesta();

        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          console.log(error);
        }
      }
    );
  }

  getComentariosxPropuesta() {
    this._comentarioService.getComentariosxRestaurant(this.token, this.restaurantId).subscribe(
      response => {
        if (!response.comentarios) {
        } else {
          this.comentarios = response.comentarios;
          this.cantidad = this.comentarios.length;
          console.log(this.comentarios);
          for (const comentario of this.comentarios) {
            this.promedio = this.promedio + comentario.ambiente +
              comentario.relacion + comentario.comida +
              comentario.calidad;
          }
          console.log(this.promedio);
          this.promedio = this.promedio / (4 * this.cantidad);

        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
        }
      }
    );
  }

  deleteComentario(idComentario: String) {
    console.log("hola mundo");
    this._comentarioService.deleteComentario(this.token, idComentario).subscribe(
      response => {
        if (!response.comentario) {
          swal('Error', 'El comentario no se elimino correctamente', 'warning');
        } else {
          swal('Comentario eliminado', 'El comentario se elimino exitosamente', 'success');
          this.getComentariosxPropuesta();
        }
      },
      error => {

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
