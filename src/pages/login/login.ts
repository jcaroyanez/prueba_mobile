import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { LoadingController } from 'ionic-angular';
import { StoreProvider } from '../../providers/store/store';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formLogin: FormGroup;
 
  ////mensajes para mostrar dependiendo del error en el formulario///////
  errorsForm = {
    'email':'',
    'password':''
  }
  messageValidator = {
    'email':{
      'required':'ingrese un correo es obligatorio ',
      'email':'ingrese un email valido '
    },
    'password':{
      'required':'ingrese una contraseña es obligatorio'
    }
  }


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _formBuilder: FormBuilder, private _usersProvider:UsersProvider,
    private _loadingCtrl:LoadingController, private _storeProvider:StoreProvider ) {

    ////enlazando los campos que va tener mi formulario y que parametros de validación
    this.formLogin = this._formBuilder.group({
      'email': new FormControl('', [Validators.required,Validators.email]),
      'password': new FormControl('', Validators.required)
    });
   

   ////suscribiendo me al flujo de datos del formulario para validarlos  
   this.formLogin.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter(){
    this._storeProvider.getDato().then(data =>{
      console.log('dato',data);
      //// validar si exite una session del usuario lo direcionamos al home
      if(data){
        this.navCtrl.setRoot('HomePage');
      }
    })
  }


  onSubmit(){
    //// creando el loader
    let loader = this._loadingCtrl.create({
         content:'Cargando'
        });
    loader.present();

    /////creando una constante con los datos del formaulario para enviar al servicio
    const user = {
      'email':this.formLogin.get('email').value,
      'password':this.formLogin.get('password').value
    }
    ///// enviando json al servicio  y suscribiendo a la respuesta de la peticion
    this._usersProvider.login(user).subscribe(rest => {
       console.log(rest);
       this._storeProvider.setDato(rest);
       this.navCtrl.setRoot('HomePage');
    },error => {
      ////si ocurre un error en al peticion
      loader.dismiss();
      console.log('error',error);
      alert("Error"+JSON.stringify(error));
    },() => {
      loader.dismiss();
    });
  }

  ///metodo encargado de cargar los mensajes dependiendo del validators no cumplido
  onValueChanged(data?: any) {
    if (!this.formLogin) { return; }
    const form = this.formLogin;
    for (const field in this.errorsForm) {
      this.errorsForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.messageValidator[field];
        for (const key in control.errors) {
          this.errorsForm[field] += " - "+messages[key] + '  ';
         }
       }
     }
   }

}
