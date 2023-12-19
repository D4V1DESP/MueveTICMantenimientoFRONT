import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsModule } from './constants';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  msg?: string
  constructor(private httpClient : HttpClient, private constantsModule: ConstantsModule) { }
  delete(licensePlate : string){
    return this.httpClient.put(this.constantsModule.SERVER_URL + "/vehicles/"+licensePlate, {}, {withCredentials: true})
  }

  mod(info : any, licensePlate : string){
    return this.httpClient.patch(this.constantsModule.SERVER_URL + "/vehicles/"+licensePlate, info, {withCredentials: true})
  }


  getReserves() {
    return this.httpClient.get(this.constantsModule.SERVER_URL + "/me/reserved" ,{withCredentials: true})
  }

  getLstReserves() {
    return this.httpClient.get(this.constantsModule.SERVER_URL + "/me/reserved/all" ,{withCredentials: true})
  }

  getLstReservesTelefonicas() {
    return this.httpClient.get(this.constantsModule.SERVER_URL + "/me/reserved/allReserve" ,{withCredentials: true});
  }

  finalizeReserve(info: any) {
    return this.httpClient.patch(this.constantsModule.SERVER_URL + "/me/reserved/finalize", info, {withCredentials: true})
  }

  deleteReserva(){
    return this.httpClient.delete(this.constantsModule.SERVER_URL + "/me/reserved/cancel",{withCredentials: true})
  }

  deleteReservaTelefonica(idUsuario : string){
    return this.httpClient.delete(this.constantsModule.SERVER_URL + "/me/reserved/cancelTelefonica/" +idUsuario, {withCredentials: true})
  }

  postReserve(vehicleLicensePlate : string){
    return this.httpClient.post(this.constantsModule.SERVER_URL + "/me/reserve/" + vehicleLicensePlate, {}, {withCredentials: true})
  }

  getVehiculos(matricula: string) {
    return this.httpClient.get(this.constantsModule.SERVER_URL + "/vehicles/" + matricula, {withCredentials: true})
  }

  añadirVehiculo(info: any) {
    let endpoint = null

    switch (info.type) {
      case 1:
        endpoint = "createCar"
        break;
      case 2:
        endpoint = "createBike"
        break;
      case 3:
        endpoint = "createScooter"
        break;
    }
    return this.httpClient.post(this.constantsModule.SERVER_URL + "/vehicles/" + endpoint + "/", info, { withCredentials: true })
  }

  getListaVehiculos() {
    return this.httpClient.get(this.constantsModule.SERVER_URL + "/vehicles/" , {withCredentials: true})
  }
}
