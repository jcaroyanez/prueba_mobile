import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../util';
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  constructor(public http: HttpClient) {}

  login(user:any){
    /// creando la cabezera de la peticion post 
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    ///// convirtiendo los datos entrantes en un json 
    const body = JSON.stringify(user);
    //// retornando los valores de la peticion post
    return this.http.post(URL+"/login",body,{headers:headers});
  }

  register(user:any){
    /// creando la cabezera de la peticion post 
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    ///// convirtiendo los datos entrantes en un json 
    const body = JSON.stringify(user);
    //// retornando los valores de la peticion post
    return this.http.post(URL+"/register",body,{headers:headers});
  }

}
