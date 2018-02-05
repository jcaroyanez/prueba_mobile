import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider} from '../../providers/users/users';
import { StoreProvider } from '../../providers/store/store';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
 
  formRegister: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _formBuilder: FormBuilder,private _sersProvider:UsersProvider,
    private _storeProvider:StoreProvider) {
        ////enlazando los campos que va tener mi formulario y que parametros de validación
        this.formRegister = this._formBuilder.group({
          'name':new FormControl('', [Validators.required]),
          'email':new FormControl('', [Validators.required,Validators.email]),
          'password':new FormControl('', [Validators.required]),
          'passwordV':new FormControl('', [Validators.required])
        })
  }

  ionViewDidLoad() {
  }

  onSubmit(){
    /////creando una constante con los datos del formaulario para enviar al servicio
    const data = {
      name:this.formRegister.get('name').value,
      email:this.formRegister.get('email').value,
      password:this.formRegister.get('password').value,
      password_confirmation:this.formRegister.get('passwordV').value
    }
    //// validando que la confirmacion de las 2 claves conincidan
    if(data.password === data.password_confirmation){
      this._sersProvider.register(data).subscribe(data => {
        //// guardando la respuesta del servicio y redirigir al Homepage
        this._storeProvider.setDato(data);
        this.navCtrl.setRoot('HomePage');
      },error => {
        console.log(error);
      },() => {
      
      })
    }else{
      alert('Contraseñas no coinciden');
    }
  }

}
