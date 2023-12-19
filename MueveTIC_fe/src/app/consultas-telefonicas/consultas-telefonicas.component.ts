import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { ReservationsComponent } from '../reservations/reservations.component';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-consultas-telefonicas',
  templateUrl: './consultas-telefonicas.component.html',
  styleUrls: ['./consultas-telefonicas.component.css']
})
export class ConsultasTelefonicasComponent {

  constructor(public accountService: AccountService, private router: Router, private vehicleService : VehicleService) {}
  
  page : number = 1
  mostrarLista : boolean = true
  confirmarFinalizacion : boolean = false
  confirmarCancelacion : boolean = false
  status?: string = 'ACTIVA'
  id: string = '' //Para que funcione bien el html no puede ser nulo
  vehicle?: string
  user?: string
  email?: string
  endDate?: Date
  startDate?: Date
  valuation?: number
  comment?: string
  msg?: string = "Elija una opción"
  filterStatus?: string = 'FINALIZADA'
  reserva? : any
  lstReserv? : any
  lstReserves? : any

  redirectToReservas() {
    this.router.navigate(['/reservations'])
  }

  redirectToVehiculos() {
    this.router.navigate(['/vehiculos']);
  }

  menu(){
    this.router.navigate(['/inicio']);
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

  cancelSelect(){
    this.page = 1
  }

  selecionarRe(pos : any){
    this.reserva=pos
    this.id = pos["id"]
    this.endDate = pos["end"]
    this.startDate = pos["start"]
    this.user = pos["userId"]
    this.status = pos["state"]
    this.vehicle = pos["vehicle"]["licensePlate"]
    this.valuation = pos["rating"]
    this.comment = pos["comment"]
    this.getEmail();
    this.email = this.email;
    this.page = 0
  }

  getEmail(){

    this.accountService.getUser(this.reserva["userId"])
    .subscribe({
      next: respuesta => {
        this.userInfo(respuesta)
      },
      error: error => {
        this.msg = "Error al obtener el usuario, por favor, asegúrese de que el id es correcto"
      }
    })
  }
  

  userInfo(user : any){
    this.email = user.email;
  }


  listReservasTelefonicas(){
    this.page = 2
    this.consultaTelefonica()
  }

  consultaTelefonica(){
    //Cuando se ejecute se buscan los vehículos teniendo en cuenta los filtros establecidos
    this.vehicleService.getLstReservesTelefonicas()
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

  cancelarReserva(){
    this.status = "CANCELADA"
    this.vehicleService.deleteReservaTelefonica(this.reserva["userId"])
    .subscribe({
      next: respuesta => {
        this.msg = "Reserva cancelada correctamente"
        this.page = 1
      },
      error: error => {
        this.msg = "Ha ocurrido un error al cancelar la reserva"
      }
    })
  }
}
