import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-formcomentario',
  templateUrl: './formcomentario.component.html',
  styleUrls: ['./formcomentario.component.css']
})
export class FormcomentarioComponent implements OnInit {
  tipoControl = new FormControl([Validators.required]);
  tipos = [
    { name: 'Comida china' },
    { name: 'Comida japonesa' },
    { name: 'Pescados y mariscos' },
    { name: 'Hornos y parrillas' },
  ];

  constructor() { }

  ngOnInit() {
    this.dropdown();
  }

dropdown()
{
  var options = [];

$( '.dropdown-menu a' ).on( 'click', function( event ) {

   var $target = $( event.currentTarget ),
       val = $target.attr( 'data-value' ),
       $inp = $target.find( 'input' ),
       idx;

   if ( ( idx = options.indexOf( val ) ) > -1 ) {
      options.splice( idx, 1 );
      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
   } else {
      options.push( val );
      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
   }

   $( event.target ).blur();

   console.log( options );
   return false;
});
}

}
