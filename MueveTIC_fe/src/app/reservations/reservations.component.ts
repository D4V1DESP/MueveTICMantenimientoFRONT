import { Component } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  page : number = 0
  confirmarFinalizacion : boolean = false
  confirmarCancelacion : boolean = false
  status?: string = 'ACTIVA'
  id: string = '' //Para que funcione bien el html no puede ser nulo
  vehicle?: string
  user?: string
  endDate?: Date
  startDate?: Date
  valuation?: number
  comment?: string
  msg?: string = "Elija una opción"
  filterStatus?: string = 'FINALIZADA'
  reserva? : any
  lstReserv? : any
  lstReserves? : any

  constructor(private vehicleService: VehicleService, private Router: Router, public AccountService: AccountService) {
    let _id = sessionStorage.getItem("idReserva")
    if (_id != null) {
      this.id = _id
      sessionStorage.removeItem("idReserva")
      this.select()
    }

    this.vehicleService = vehicleService;
    this.Router = Router;
  }

  isUser(){
    if (this.AccountService.user.role == "MEMBER"){
      return true
    } else {
      return false
    }
  }

  isTelephoneAttention(){
    if(this.AccountService.user.role == "TELEPHONEATTENTION"){
      return true
    } else {
      return false
    }
  }

  menu(){
    this.Router.navigate(['/inicio']);
  }

  select(){
    this.id = ''
    this.page=1
    this.msg = ""
    this.getReserva()
  }
  cancelSelect(){
    this.page=0
    this.msg = ""
  }

  finish(){
    this.confirmarFinalizacion = true
    this.msg = "Valore y confirme la finalización de la reserva"
  }

  confirmFinish(){
    this.confirmarFinalizacion = false;
    if (this.valuation !== undefined && this.valuation >= 0 && this.valuation <= 5) {
      let info = { rating: this.valuation, comment: this.comment };
      this.vehicleService.finalizeReserve(info)
        .subscribe({
          next: respuesta => {
            console.log(respuesta);
            this.msg = "Reserva finalizada correctamente";
            this.status = "FINALIZADA";
            this.page = 0
          },
          error: error => {
            this.msg = "Ha ocurrido un error al finalizar la reserva";
          }
        });
    }
  }

  cancelFinish(){
    this.confirmarFinalizacion = false
    this.msg = ""
  }
  
  cancel(){
    this.confirmarCancelacion = true
    this.msg = "Confirme la cancelación de la reserva"
  }

  confirmCancel(){
    this.confirmarCancelacion = false
    this.status = "CANCELADA"
    this.vehicleService.deleteReserva()
    .subscribe({
      next: respuesta => {
        console.log(respuesta)
        this.msg = "Reserva cancelada correctamente"
        this.page = 0
      },
      error: error => {
        this.msg = "Ha ocurrido un error al cancelar la reserva"
      }
    })
  }

  cancelCancel(){
    this.confirmarCancelacion = false
    this.msg = ""
  }

  list(){
    this.page = 2
    this.consulta()
  }

  selecionarRe(pos : any){
    console.log(pos["id"])
    this.id = pos["id"]
    this.endDate = pos["end"]
    this.startDate = pos["start"]
    this.user = pos["userId"]
    this.status = pos["state"]
    this.vehicle = pos["vehicle"]["licensePlate"]
    this.valuation = pos["rating"]
    this.comment = pos["comment"]
    this.page = 1
  }

  search(){
    //Cuando se ejecute se buscan los vehículos teniendo en cuenta los filtros establecidos
    this.lstReserv = this.lstReserves.filter((reserva: { [x: string]: string }) => {
      if (this.filterStatus == "ACTIVA" && reserva["state"] == "ACTIVA") {
        return true;
      } else if (this.filterStatus == "CANCELADA" && reserva["state"] == "CANCELADA") {
        return true;
      } else if (this.filterStatus == "FINALIZADA" && reserva["state"] == "FINALIZADA") {
        return true;
      }
      return false;
    });
  }


  reservVeh(){
    //Redirige a vehículos para que el usuario pueda reservar, cumple la misma función que e botón del menu
    this.Router.navigate(['/vehiculos']);
  }
  getReserva () {
    this.vehicleService.getReserves()
      .subscribe({
        next: respuesta => {
          //this.msg = "Success"
          this.reserva = respuesta
          this.infoReserva(this.reserva)
        },
        error: error => {
          //this.msg = "Error"
        }
      })

  }

  infoReserva(reserva : any){
    this.id = reserva["id"]
    this.endDate = reserva["end"]
    this.startDate = reserva["start"]
    this.user = reserva["userId"]
    this.status = reserva["state"]
    this.vehicle = reserva["vehicle"]["licensePlate"]
    this.page=1
    this.msg = ""
  }

  consulta(){
    //Cuando se ejecute se buscan los vehículos teniendo en cuenta los filtros establecidos
    this.vehicleService.getLstReserves()
    .subscribe({
      next: respuesta => {
        this.msg = ""
        this.lstReserves = respuesta
        this.search()
        //this.infoVehiculo(this.lstVehiculos)
      },
      error: error => {
        this.msg = "Ha ocurrido un error al mostrar la reserva especificada";
      }
    })
  }
}
