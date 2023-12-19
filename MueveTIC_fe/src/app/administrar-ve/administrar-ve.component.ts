//import { AccountService } from './../account.service';
import { Component } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-ve',
  templateUrl: './administrar-ve.component.html',
  styleUrls: ['./administrar-ve.component.css']
})
export class AdministrarVeComponent {
  haveReserve : boolean = false
  page : number = 0
  crearVe : boolean = false
  confirmarEliminar : boolean = false
  confirmarModificar : boolean = false
  confirmarReserva : boolean = false
  confirmarCrear : boolean = false
  id? : string
  type? : string
  model? : string
  reserva? : any
  address? : string
  vTypeValue? : string
  msg? : string = "Introduzca la matricula del vehículo"
  filterType? : string = "Coche"
  filterDis? : string
  helmet? : boolean
  lstVehiculos? : any
  lstVehicles? : any
  vehiculo? : any
  tipo? : number
  estado? : string = "DISPONIBLE"
  battery? : number = 100
  deactivated? : boolean 

  constructor(private vehicleService : VehicleService, public AccountService : AccountService, private Router : Router) {
    this.reserveExists()
  }

  isUser(){
    if (this.AccountService.user.role == "MEMBER"){
      return true
    } else {
      return false
    }
  }

  isAdmin(){
    if (this.AccountService.user.role == "ADMIN"){
        return true
    }else{
      return false
    }
}
isAttTlfn(){
  if (this.AccountService.user.role == "TELEPHONEATTENTION"){
      return true
  }else{
    return false
  }
}

  menu(){
    this.Router.navigate(['/inicio']);
  }

  delete(){
    this.confirmarEliminar=true
    this.msg = "Confime la eliminación del vehículo"
  }
  confirmDelete(){
    this.confirmarEliminar=false
    if (this.id==null){
      this.msg = "Introduce una matrícula"
    } else {
      this.vehicleService.delete(this.id).subscribe({
        next: respuesta => {
          this.cancelSelect()
          this.msg = "Eliminación exitosa"
        },
        error: error => {
          if (error.status == 409){
            this.msg = "El vehículo no se puede eliminar porque está reservado"
          } else {
            this.msg = "El vehículo no existe"
          }
        }
      })
    }
  }
  cancelDelete(){
    this.confirmarEliminar=false
    this.msg = "Eliminación cancelada"
  }
  mod(){
    this.confirmarModificar=true
    this.msg = "Confime la modificación del vehículo"
  }

  confirmMod(){
    this.confirmarModificar=false

    if (this.id==null){
      this.msg = "Introduce una matrícula"
      return
    }

    let info : any = {
      model : this.model,
      location: this.address,
      battery: this.battery
    }

    switch(this.type){
      case "Coche":
        info.seats = Number(this.vTypeValue)
        info.type = 1
        break
      case "Moto":
        info.includesHelmet = Boolean(this.vTypeValue)
        info.type = 2
        break
      case "Patinete":
        info.color = this.vTypeValue
        info.type = 3
        break
      default:
        this.msg = "Introduce un tipo de vehículo"
        return
    }

    this.vehicleService.mod(info, this.id).subscribe({
      next: _ => {
        this.msg = "Modificación exitosa"
      },
      error: _ => {
        this.msg = "Error al modificar"
      }
    })

  }

  reserveExists(){
    this.vehicleService.getReserves().subscribe({
      next: (respuesta: any) => {
        this.haveReserve = respuesta.id != undefined
      },
      error: _ => {}
    })
  }

  cancelMod(){
    this.confirmarModificar=false
    this.msg = "Modificación cancelada"
  }

  select(){
    if (this.id == null || this.id == ""){
      this.msg = "Introduce una matrícula"
    }else{
      this.vehiculo = null
      this.getVehiculo(this.id).subscribe({
        next: respuesta => {
          this.vehiculo = respuesta
          if (this.vehiculo["deactivated"] == true){
            this.msg = "Este vehículo no existe"
            return
          }
          this.infoVehiculo(this.vehiculo)
          this.page = 1
          this.msg = ""
        },
        error: _ => {
          this.msg = "Este vehículo no existe"
        }
      })
    }
  }

  redirectToReservations(){
    this.Router.navigate(['/reservations']);
  }

  cancelSelect(){
    this.page=0
    this.msg = "Introduzca la matricula del vehículo"
    this.crearVe = false
  }

  reserv(){
    this.confirmarReserva=true
    this.msg ="Confime la reserva del vehículo"
  }

  confirmReserv(){
    this.confirmarReserva=false
    this.estado = "RESERVADO"
    console.log(this.id);
    if (this.id !== undefined) {
      this.vehicleService.postReserve(this.id,this.AccountService.cliente)
        .subscribe({
          next: (respuesta: any) => {
            console.log(respuesta);
            sessionStorage.setItem("idReserva", respuesta.id)
            this.Router.navigate(['/reservations']);
            this.msg = "Se ha reservado el vehículo correctamente";
          },
          error: error => {
            this.msg = "Ha ocurrido un error al reservar el vehículo";
          }
        });
    } else {
      this.msg = "Introduzca una matrícula";
    }
  }

  confirmReservAtt(){
    this.confirmarReserva=false
    this.estado = "RESERVADO"
    console.log(this.id);
    if (this.id !== undefined) {
      this.vehicleService.postReserveAtt(this.id,this.AccountService.cliente)
        .subscribe({
          next: (respuesta: any) => {
            console.log(respuesta);
            sessionStorage.setItem("idReserva", respuesta.id)
            this.Router.navigate(['/reservations']);
            this.msg = "Se ha reservado el vehículo correctamente";
          },
          error: error => {
            if(error.status===406){
              this.msg = "Este cliente ya tiene una reserva activa";
            }
            else{
              this.msg = "Ha ocurrido un error al reservar el vehículo";
            }
          }
        });
    } else {
      this.msg = "Introduzca una matrícula";
    }
  }

  cancelReserv(){
    this.confirmarReserva=false
    this.msg = "Modificación cancelada"
  }

  //Selecciona la opción
  createV(){
    if (this.id == null || this.id == "") {
      this.msg = "Introduce una matrícula"
      return
    }

    this.vehicleService.getVehiculos(this.id).subscribe({
      next: respuesta => {
        this.msg = "Este vehículo ya existe"
      },
      error: _ => {
        this.infoVehiculoNull()
        this.msg = ""
        this.crearVe = true
        this.page = 1
      }
    })
  }

  //Crear el vehículo una vez dados los parámetros
  create(){
    this.confirmarCrear=true
    this.msg = "Confime la creación del vehículo"
  }

  confirmCreate(){
    this.confirmarCrear=false

    let info : any = {
      licensePlate : this.id,
      model : this.model,
      location: this.address,
      battery: 100,
    }

    switch(this.type){
      case "Coche":
        info.seats = Number(this.vTypeValue)
        info.type = 1
        break
      case "Moto":
        info.includesHelmet = Boolean(this.vTypeValue)
        info.type = 2
        break
      case "Patinete":
        info.color = this.vTypeValue
        info.type = 3
        break
      default:
        this.msg = "Introduce un tipo de vehículo"
        return
    }

    this.vehicleService.añadirVehiculo(info).subscribe({
      next: _ => {
        this.msg = "Creación exitosa"
      },
      error: _ => {
        this.msg = "Error al crear"
      }
    })

  }

  cancelCreate(){
    this.confirmarCrear=false
    this.msg = "Creación cancelada"
  }

  list(){
    this.page = 2
    this.filterDis="DISPONIBLE"
    this.consulta()
  }

  search() {
    this.lstVehicles = this.lstVehiculos.filter((vehiculo: { [x: string]: number | string | boolean; }) => {
      if (this.filterType == "Coche" && vehiculo["type"] == 1 && vehiculo["status"] == this.filterDis && vehiculo["deactivated"] == false) {
        return true;
      } else if (this.filterType == "Moto" && vehiculo["type"] == 2 && vehiculo["status"] == this.filterDis  && vehiculo["deactivated"] == false) {
        return true;
      } else if (this.filterType == "Patinete" && vehiculo["type"] == 3 && vehiculo["status"] == this.filterDis && vehiculo["deactivated"] == false) {
        return true;
      }
      return false;
    });

  }


  selecionarVe(pos : string){
    this.id = pos
    this.page = 1
    this.getVehiculo(pos).subscribe({
      next: respuesta => {
        this.vehiculo = respuesta
        this.infoVehiculo(this.vehiculo)
        this.msg = ""
      },
      error: _ => {
        this.msg = "Este vehículo no existe"
      }
    })
  }

  getVehiculo (matricula: string) {
    return this.vehicleService.getVehiculos(matricula)

  }

  infoVehiculoNull(){
    this.model = ""
    this.address = ""
    this.estado = "DISPONIBLE"
    this.battery = 100
    this.vTypeValue = ""
    this.type = ""
    this.deactivated = false
  }

  infoVehiculo(vehiculo : any){
    this.id = vehiculo["licensePlate"]
    this.model = vehiculo["model"]
    this.address = vehiculo["location"]
    this.estado = vehiculo["status"]
    this.battery = vehiculo["battery"]
    if (vehiculo["type"] == 1){
      this.vTypeValue = vehiculo["seats"]
      this.type = "Coche"
    } else if (vehiculo["type"] == 2){
      this.vTypeValue = vehiculo["includesHelmet"]
      this.type = "Moto"
    } else if (vehiculo["type"] == 3){
      this.vTypeValue = vehiculo["color"]
      this.type = "Patinete"
    }
    this.deactivated = vehiculo["deactivated"]
  }

  consulta(){
    //Cuando se ejecute se buscan los vehículos teniendo en cuenta los filtros establecidos
    this.vehicleService.getListaVehiculos()
    .subscribe({
      next: respuesta => {
        this.lstVehiculos = respuesta
        this.search()
        //this.infoVehiculo(this.lstVehiculos)
      },
      error: _ => {
        this.msg = "Ha ocurrido un error al buscar los vehículos";
      }
    })
  }
}
