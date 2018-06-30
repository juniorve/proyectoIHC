import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
import {User} from '../models/user'


@Injectable()

export class UserService{

	public url:String;
	public identity;
	public token;

	constructor(private _http:Http){
			this.url=GLOBAL.url;
	}
  

	getUser(token:String, id:any){
		let headers = new Headers({'Content-Type':'application/json','Authorization':token});
		let options = new RequestOptions({headers:headers})

	  return this._http.get(this.url+"/user/"+id,options).map(res=>res.json());
	}

 loginUser(user_to_login, gethash=null){
			if(gethash!=null){
				user_to_login.gethash = gethash;
			}
		let json= JSON.stringify(user_to_login);
		let params = json;

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'loginUser',params,{headers:headers})
	.map(res =>res.json());

	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity!='undefined'){
			this.identity=identity;
		}else{
			this.identity=null;
		}
		return this.identity;
	}


	getToken(){
	    let token = localStorage.getItem('token');

		if(token!='undefined'){
			this.token=token;
		}else{
			this.token=null;
		}
		return this.token;

	}

}