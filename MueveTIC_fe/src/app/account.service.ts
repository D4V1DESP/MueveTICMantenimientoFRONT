import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsModule } from './constants';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  event!: Event;
  msg? : string
  vehiculo? : any
  user? : any = {}
  auxUser? : any = {}
  newBirthdate? : Date

  eventPipe : EventEmitter<string> = new EventEmitter<string>();

  constructor(private httpClient : HttpClient, private constantsModule: ConstantsModule) {}

  login(info: any): Observable<any>{
    return this.httpClient.post(this.constantsModule.SERVER_URL + "/users/login/", info)
  }

  admin(info: any) {
    this.httpClient.post(this.constantsModule.SERVER_URL + "/admins/createAdmin/", info, {withCredentials: true})
      .subscribe({
        next: respuesta => {
          console.log(respuesta)
        },
        error: _ => {}
      })
  }

  encargado(info: any) {
    console.log(info)
    this.httpClient.post(this.constantsModule.SERVER_URL + "/admins/createMaintenance/", info, {withCredentials: true})
      .subscribe({
        next: respuesta => {
          console.log(respuesta)
        },
        error: _ => {}
      })
  }
  telephoneAttention(info: any) {
    console.log(info)
    this.httpClient.post(this.constantsModule.SERVER_URL + "/admins/createTelephoneAttention/", info, {withCredentials: true})
      .subscribe({
        next: respuesta => {
          console.log(respuesta)
        },
        error: _ => {}
      })
  }
  delete(){
    if (confirm("¿Está seguro de que desea eliminar su cuenta?"))
      return this.httpClient.delete(this.constantsModule.SERVER_URL + "/me/", {withCredentials: true})
    return null
  }

  mod(info : any, email : string){
    this.httpClient.patch(this.constantsModule.SERVER_URL + "/admins/users/"+ email, info, {withCredentials: true})
      .subscribe({
        next: respuesta => {
          console.log(respuesta)
          this.msg = "Success"
        },
        error: error => {
          this.msg = "Error"
        }
      }
      )
    return this.msg
  }

  getMe() {
    return this.httpClient.get(this.constantsModule.SERVER_URL + "/me/", {withCredentials: true})
  }

  getUser(id: string) {
    return this.httpClient.get(this.constantsModule.SERVER_URL + "/admins/users/" + id, {withCredentials: true})
  }

  getUserList(tipo: string){
    return this.httpClient.get(this.constantsModule.SERVER_URL + "/admins/users/?type="+ tipo, {withCredentials: true})
  }

  delUser(userId: string){
    this.httpClient.delete(this.constantsModule.SERVER_URL + "/admins/users/" + userId, {withCredentials: true})
    .subscribe({
      next: respuesta => {
        console.log(respuesta)
        this.msg = "Usuario bloqueado correctamente"
      },
      error: error => {
        console.log(error)
        this.msg = "El usuario no se encuentra registrado"
      }
    })
    return this.msg
  }

  patchUser(userid: string){
    this.httpClient.patch(this.constantsModule.SERVER_URL + "/admins/users/reactivate/" + userid, {}, {withCredentials: true})
    .subscribe({
      next: respuesta => {
        //console.log(respuesta)
        this.msg = "El usuario ha sido reactivado correctamente"
      },
      error: error => {
        this.msg = "El usuario no se encuentra registrado"
      }
    })
    return this.msg
  }

  update() {
    return this.httpClient.patch(this.constantsModule.SERVER_URL + "/me/", this.auxUser, {withCredentials: true})
  }

  validateTelephone(telephone?: number) {
    if (telephone == undefined)
      return false
    return telephone > 100000000 && telephone < 999999999
  }

  validateDni(dni?: string) {
    if (dni == undefined)
      return false
    return new RegExp("^[0-9]{8}[A-Za-z]$").test(dni)
  }

  meterConfiguracion(info: any) {
    this.httpClient.put(this.constantsModule.SERVER_URL + "/admins/SystemConfig", info, {withCredentials: true})
      .subscribe({
        next: respuesta => {
          console.log(respuesta)
        },
        error: error => {
          console.log(error)
        }
      })
  }

  getConfiguracion() {
    return this.httpClient.get(this.constantsModule.SERVER_URL + "/admins/SystemConfig", {withCredentials: true})
  }

}
