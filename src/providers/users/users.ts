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

  constructor(public http: HttpClient) {
    console.log('Hello UsersProvider Provider');
  }

  login(user:any){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
     const body = JSON.stringify(user);
     return this.http.post(URL,body,{headers:headers});
  }

}
