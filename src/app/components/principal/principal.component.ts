import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Comentario } from '../../models/comentario';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';
import { GLOBAL } from '../../services/global';
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [UserService, ComentarioService]
})
export class PrincipalComponent implements OnInit {
  token: string;
  identity;
  restaurantId: string;
  public comentarios: any[] = [];
  promedio: any = 0;
  _comentarios:any[]=[];
  public cantidad: number;
  url;

  constructor( private _userService: UserService,
    private _route: ActivatedRoute,
    private _comentarioService: ComentarioService,
    private _router: Router) {
    this.url = GLOBAL.url;

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }


  ngOnInit() {
    this.botones('carrusel', 'product_','izquierda_flecha','derecha_flecha');
   this.botones('carrusel_2', 'produc_','izquierda_flech','derecha_flech');

this.getComentariosxUsuario();
  }


  upRestaurant(idRestaurant: String) {
    this._router.navigate(['/restaurant/' + idRestaurant]);
  }


  getComentariosxUsuario() {
    this._comentarioService.getComentariosxUsuario(this.token, this.identity._id).subscribe(
      response => {
        if (!response.comentarios) {
        } else {
          this.comentarios = response.comentarios;
          this.cantidad = this.comentarios.length;
          // console.log(this.comentarios);
           for (const comentario of this.comentarios) {
            this.promedio = this.promedio + comentario.ambiente +
              comentario.relacion + comentario.comida +
              comentario.calidad;

//promedio
            /*   this._comentarioService.getComentariosxRestaurant(this.token, comentario.restaurant._id).subscribe(
                response => {
                  if (!response.comentarios) {
                  } else {
                    this._comentarios = response.comentarios;
                    this.cantidad = this._comentarios.length;
                    for (const coment of this._comentarios) {
                      this.promedio = this.promedio + coment.ambiente +
                        coment.relacion + coment.comida +
                        coment.calidad;
                        console.log(this.promedio / (4 * this.cantidad) );
                    }
                    this.promedio = this.promedio / (4 * this.cantidad);
                    console.log(this._comentarios);

                  }
                },
                error => {
                  var errorMessage = <any>error;
                  if (errorMessage != null) {
                  }
                }
              ); */


            }
       //   this.promedio = this.promedio / (4 * this.cantidad);

        //total


        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
        }
      }
    );
  }



  botones(clase:any, producto:any, flecha_i:any, flecha_d:any){
    var posicion = 0;
    var imagenes = new Array();

    $(document).ready(function() {
      //alert(jQuery('.texto').html());
      var numeroImatges = 6;
      if(numeroImatges<=3){
          $('.'+flecha_d).css('display','none');
       $('.'+flecha_i).css('display','none');
      }

        $('.'+flecha_i).on('click',function(){
            if(posicion>0){
               posicion = posicion-1;
           }else{
               posicion = numeroImatges-3;
           }
           $("."+clase).animate({"left": -($('#'+producto+posicion).position().left)}, 600);
           return false;
        });

        $('.'+flecha_i).hover(function(){
            $(this).css('opacity','0.5');
        },function(){
            $(this).css('opacity','1');
        });

        $('.'+flecha_d).hover(function(){
            $(this).css('opacity','0.5');
        },function(){
            $(this).css('opacity','1');
        });

        $('.'+flecha_d).on('click',function(){
           if(numeroImatges>posicion+3){
               posicion = posicion+1;
           }else{
               posicion = 0;
           }
           $("."+clase).animate({"left": -($('#'+producto+posicion).position().left)}, 600);
           return false;
        });

    });
  }

}
