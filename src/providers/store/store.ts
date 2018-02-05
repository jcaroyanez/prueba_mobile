import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {
 
  
  constructor(public http: HttpClient,private _storage:Storage) {}

 /// guardar los datos del usuario en el storage 
 setDato(user){
   this._storage.set('userP',user);
 }

 /// recuperar los datos del usuario del storage
 getDato(){
   return this._storage.get('userP');
 }

 /// removel los datos del usuario del storage
 remove(){
   this._storage.remove('userP');
 }

}
