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
    console.log(pos["id"])
    this.id = pos["id"]
    this.endDate = pos["end"]
    this.startDate = pos["start"]
    this.user = pos["userId"]
    this.status = pos["state"]
    this.vehicle = pos["vehicle"]["licensePlate"]
    this.valuation = pos["rating"]
    this.comment = pos["comment"]
    this.page = 0
  }

  listReservasTelefonicas(){
    this.page = 2
    this.consultaTelefonica()
  }

  consultaTelefonica(){
    //Cuando se ejecute se buscan los vehículos teniendo en cuenta los filtros establecidos
    console.log("HOLA")
    this.vehicleService.getLstReservesTelefonicas()
    .subscribe({
      next: respuesta => {
        console.log(respuesta)
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
