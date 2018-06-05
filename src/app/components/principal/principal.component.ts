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
    this.botones();
  }

  botones(){
    var posicion = 0;
    var imagenes = new Array();

    $(document).ready(function() {
      //alert(jQuery('.texto').html());
      var numeroImatges = 6;
      if(numeroImatges<=3){
          $('.derecha_flecha').css('display','none');
       $('.izquierda_flecha').css('display','none');
      }
   
        $('.izquierda_flecha').on('click',function(){
            if(posicion>0){
               posicion = posicion-1;
           }else{
               posicion = numeroImatges-3;
           }
           $(".carrusel").animate({"left": -($('#product_'+posicion).position().left)}, 600);
           return false;
        });
   
        $('.izquierda_flecha').hover(function(){
            $(this).css('opacity','0.5');
        },function(){
            $(this).css('opacity','1');
        });
   
        $('.derecha_flecha').hover(function(){
            $(this).css('opacity','0.5');
        },function(){
            $(this).css('opacity','1');
        });
   
        $('.derecha_flecha').on('click',function(){
           if(numeroImatges>posicion+3){
               posicion = posicion+1;
           }else{
               posicion = 0;
           }
           $(".carrusel").animate({"left": -($('#product_'+posicion).position().left)}, 600);
           return false;
        });
   
    });
  }

}
