import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  minB? : number
  use? : number
  price? : number
  maxM? : number
  confirmarAplicacion : boolean = false
  msg : string = ""

  constructor(public AccountService: AccountService, public Router: Router) { }

  ngOnInit(){
    this.AccountService.getConfiguracion()
    .subscribe({
      next: respuesta => {
        this.infoConfig(respuesta)
        console.log(respuesta)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  infoConfig(respuesta : any){
    this.minB = respuesta.minBattery
    this.use = respuesta.batteryPerRide
    this.price = respuesta.ridePrice
    this.maxM = respuesta.maxMaintenance
  }

  isAdmin(){
    if (this.AccountService.user.role == "ADMIN"){
        return true
    }else{
      return false
    }
  }

  apply(){
    this.confirmarAplicacion = true;
    this.msg = "Confirme la aplicación de los cambios"
  }

  confirmApply(){
    this.confirmarAplicacion = false;
    let info = {
      minBattery: this.minB,
      batteryPerRide: this.use,
      ridePrice: this.price,
      maxMaintenance: this.maxM
    }
    this.AccountService.meterConfiguracion(info)
    this.msg = "Cambios realizados"
  }

  cancelApply(){
    this.confirmarAplicacion = false;
    this.msg = "Cambios cancelados"
  }

  menu(){
      this.Router.navigate(['/inicio'])
  }
}
