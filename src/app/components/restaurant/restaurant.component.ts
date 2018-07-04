import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Restaurant } from '../../models/restaurant';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers: [RestaurantService]
})
export class RestaurantComponent implements OnInit {
  token: string;
  usuario: User;
  restaurantId: string;
  restaurant: Restaurant;

  constructor(private _restaurantService: RestaurantService, private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.token = this._userService.getToken();
    this.usuario = this._userService.getIdentity();
    this.restaurant = new Restaurant('', '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this.getRestaurantUrl();
    this.getRestaurant();
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
          console.log(this.restaurant);
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


}
