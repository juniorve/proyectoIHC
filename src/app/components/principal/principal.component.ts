import { Component, OnInit } from '@angular/core';
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.botones('carrusel', 'product_','izquierda_flecha','derecha_flecha');
   this.botones('carrusel_2', 'produc_','izquierda_flech','derecha_flech');


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
