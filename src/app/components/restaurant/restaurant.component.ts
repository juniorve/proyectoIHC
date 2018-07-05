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
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers: [RestaurantService, ComentarioService]
})
export class RestaurantComponent implements OnInit {
  token: string;
  usuario: User;
  restaurantId: string;
  restaurant: Restaurant;
  public comentarios: Comentario[] = [];
  public cantidad: number;

  constructor(private _restaurantService: RestaurantService, private _userService: UserService,
    private _route: ActivatedRoute,
    private _comentarioService: ComentarioService,
    private _router: Router) {
    this.token = this._userService.getToken();
    this.usuario = this._userService.getIdentity();
    this.restaurant = new Restaurant('', '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this.getRestaurantUrl();
    this.getRestaurant();
  }
  upComentario(idRestaurant: String) {
    this._router.navigate(['/formcomentario/' + this.restaurantId]);
  }


  getRestaurantUrl() {
    this._route.params.forEach((params: Params) => {
      if (params['id']) {
        this.restaurantId = params['id'];
      }
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
    this._comentarioService.deleteComentario(this.token, idComentario).subscribe(
      response => {
        if (!response.comentario) {
          swal('Error', 'El comentario no se elimino correctamente', 'warning');
        } else {
          swal('Restaurante registrado', 'Datos guardados correctamente', 'success');
          this.getComentariosxPropuesta();
        }
      },
      error => {

      }
    );


  }

}
