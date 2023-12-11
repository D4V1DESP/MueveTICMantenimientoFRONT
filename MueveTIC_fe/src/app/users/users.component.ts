import { DatePipe } from '@angular/common';
import { AccountService } from './../account.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  page : number = 0
  crearP : boolean = false
  confirmarEliminar : boolean = false
  confirmarModificar : boolean = false
  confirmarReactivacion : boolean = false
  confirmarCrear : boolean = false
  id? : string
  _id? : string
  name? : string
  surename? : string
  dni? : string
  type? : string = 'MEMBER'
  status? : boolean
  pass? : string
  user : any
  confPass? : string
  licence? : string
  town? : string
  drivingLicense? : string
  telfNumber? : number
  years? : number
  birthdate? : string
  msg? : string = ""
  filterType? : string = 'Admin'
  filterHab? : string = "true"
  usercreateemail : string = ""

  usersJson? : any
  lstUsers? : any
  allUsers? : any
  encontrado? : boolean = false
  valido? : boolean


  constructor(public AccountService: AccountService, private Router: Router, private datePipe: DatePipe) {
    this.AccountService.getUserList("ALL").subscribe({
      next: respuesta => {
        this.allUsers = respuesta
      },
      error: error => {
        console.log(error)
      }
    })
  }

  isAdmin(){
    return true
  }

  emailExists() {
    let existe: boolean = false;
    if (this.allUsers == null || this.usercreateemail == "" || this.usercreateemail == null) return false;
    this.allUsers.forEach((element : any) => {
      if(this.usercreateemail == element.email) {
        existe = true;
      }
    })
    return existe;
  }

  getInfoUser(){
    if (this._id==null){
      this.msg = "Introduce un id de usuario"
      return
    }
    this.AccountService.getUser(this._id)
    .subscribe({
      next: respuesta => {
        this.msg = ""
        this.user = respuesta
        this.userInfo(this.user)
      },
      error: error => {
        this.msg = "Error al obtener el usuario, por favor, asegúrese de que el id es correcto"
      }
    })
  }

  userInfo(user : any){
    this.id = user.email;
    this.name = user.name;
    this.surename = user.surname;
    this.dni = user.dni;
    this.birthdate = this.datePipe.transform(user.birthdate, 'yyyy-MM-dd')!;
    this.drivingLicense = user.drivingLicense;
    this.telfNumber = user.telephone;
    this.type = user.role;
    this.town = user.city;
    this.status = !user.deactivated;
  }

  menu(){
    this.Router.navigate(['/inicio']);
  }
  delete(){
    this.confirmarEliminar=true
    this.msg = "Confime la deshabilitación del usuario"
  }

  //funcionalidad del bloqueo de un usuario
  confirmDelete(){
    this.confirmarEliminar=false
    this.usersList()
  }

  updateEmail(){
    let buf = ""
    if (this.name != null && this.name != "")
      buf += this.name?.toLowerCase().trim().replaceAll(" ", "")
    if (this.surename != null && this.surename != "") {
      if (this.name != null && this.name != "")
        buf += "."
      buf += this.surename?.toLowerCase().trim().replaceAll(" ", "")
    }
    if (buf == "")
      this.usercreateemail = ""
    else
      this.usercreateemail = buf + "@iso2023.onmicrosoft.com"
  }

  usersList(){
    this.AccountService.getUserList("ALL")
    .subscribe({
      next: respuesta => {
        console.log(respuesta)
        this.usersJson = respuesta
        for (let i = 0; i < this.usersJson.length; i++){
          if (this.usersJson[i]["email"] == this.id){
            this.AccountService.delUser(this.usersJson[i]["id"])
            this.status=false
            this.msg = "Usuario deshabilitado"
          }
        }
      },
      error: error => {
        this.msg = "El usuario no se encuentra registrado"
      }
    })

  }
  cancelDelete(){
    this.confirmarEliminar=false
    this.msg = ""
  }

  isValid() {
    this.msg = ""

    if (!this.isValidDNI()) {
      this.msg = "El dni no es correcto, debe tener 8 digitos y una letra"
      return false;
    }

    if (this.name == null || this.name == ""){
      this.msg = "El nombre no puede estar vacío"
      return false;
    }

    if (this.surename == null || this.surename == ""){
      this.msg = "El apellido no puede estar vacío"
      return false;
    }

    if (this.type == "MEMBER" && !this.isValidTelf()){
      this.msg = "El teléfono no es correcto, debe tener 9 digitos"
      return false;
    }

    if (this.crearP) {
      if (this.emailExists()){
        this.msg = "El correo ya existe"
        return false;
      }
  
      if (this.pass == null || this.pass == ""){
        this.msg = "La contraseña no puede estar vacía"
        return false;
      }
  
      if (this.pass != this.confPass){
        this.msg = "Las contraseñas no coinciden"
        return false;
      }
    }

    return true;
  }

  isValidDNI(){

    if (!this.AccountService.validateDni(this.dni)){
      return false
    } else {
      this.msg = ""
      return true
    }
  }

  isValidTelf(){
    if (!this.AccountService.validateTelephone(this.telfNumber)){
      return false
    } else {
      this.msg = ""
      return true
    }
  }

  mod(){
    this.confirmarModificar = true
    this.msg = "Confime la modificación del usuario"
  }

  confirmMod(){
    if (this._id==null){
      this.msg = "Introduce un correo"
      return
    }
    this.AccountService.mod({
      dni: this.dni,
      name: this.name,
      surname: this.surename,
      city: this.town,
      telephone: this.telfNumber,
      birthdate: this.birthdate,
      drivingLicense: this.drivingLicense,
    }, this._id)
    this.confirmarModificar=false
    this.msg = "Modificación realizada"
  }

  cancelMod(){
    this.confirmarModificar=false
    this.msg = ""
  }
  //funcionalidad de mostrar la info del usuario
  select(tipo: String){
    if(this.id == null || this.id == ""){
        this.msg = "Error, Introduzca el correo del usuario"
    }else{

      this.pedirListaUsuarios("ALL")//en el html le paso "MEMBER"

    }

  }



  pedirListaUsuarios(tipo: String){
    this.AccountService.getUserList(tipo.toUpperCase())
      .subscribe({
        next: respuesta => {
          console.log(respuesta)
          this.encontrado = false
          this.usersJson = respuesta
          for (let i = 0; i < this.usersJson.length; i++){
            if (this.usersJson[i]["email"] == this.id){
              this.encontrado = true
              this.page = 1
              this._id = this.usersJson[i]["id"]
              this.getInfoUser()
              this.msg = ""
            }
          } if(this.encontrado == false){
            this.msg = "El usuario no existe, introduzca un correo válido"
          }

        },
        error: error => {
          this.msg = "Error, el usuario no se encuentra registrado"
        }
      })
  }

  cancelSelect(){
    this.page=0
    this.msg = ""
    this.crearP = false
  }

  reactivate(){
    this.confirmarReactivacion=true
    this.msg ="Confime la reactivación del usuario"
  }
  //funcionalidad de la reactivación de un usuario
  confirmReactivation(){
    this.confirmarReactivacion=false
    this.usersList2()

  }

  usersList2(){
    this.AccountService.getUserList("ALL")
    .subscribe({
      next: respuesta => {
        console.log(respuesta)
        this.usersJson = respuesta
        for (let i = 0; i < this.usersJson.length; i++){
          if (this.usersJson[i]["email"] == this.id){
            this.AccountService.patchUser(this.usersJson[i]["id"])
            this.status=true
            this.msg = "Perfil reactivado"
          }
        }
      },
      error: error => {
        console.log(error)
        this.msg = "Error, el usuario no se encuentra registrado"
      }
    })

  }

  cancelReactivation(){
    this.confirmarReactivacion=false
    this.msg = ""
  }

  //Selecciona la opción
  createP(){
    this.type = "TELEPHONE_ATTENTION"
    this.crearP = true
    this.page = 1
  }

  create(){
    this.confirmarCrear=true
    this.msg = "Confime la creación del usuario"
  }

  confirmCreate(){
    if (this.type == "ADMIN"){
      this.AccountService.admin({
        dni: this.dni,
        name: this.name,
        surname: this.surename,
        email: this.usercreateemail,
        password: this.pass,
        city: this.town
      })
    }
    else if (this.type == "MAINTENANCE"){
      this.AccountService.encargado({
        dni: this.dni,
        name: this.name,
        surname: this.surename,
        email: this.usercreateemail,
        password: this.pass,
        drivingLicense: this.drivingLicense,
        city: this.town,
        experience: this.years
      })
    }
    else if (this.type == "TELEPHONE_ATTENTION"){
      this.AccountService.telephoneAttention({
        dni: this.dni,
        name: this.name,
        surname: this.surename,
        email: this.usercreateemail,
        password: this.pass,
        city: this.town
      })
    }
    this.confirmarCrear=false
    this.cancelSelect()
    //this.select("MEMBER")
    this.msg = "Creación realizada"
  }

  cancelCreate(){
    this.crearP = false
    this.confirmarCrear=false
    this.msg = ""
  }

  list(){
    this.page = 2
    this.lstUsers = []
    this.AccountService.getUserList(this.type || "MEMBER").subscribe({
      next: (respuesta: any) => {
        let aux: any[] = []
        respuesta.forEach(
          (element: any) => {
            if (element.email == null || element.email == "") {
              return
            }
            if (this.filterHab=="false" && element.deactivated==true) {
              aux.push(element)
            }
            else if (this.filterHab=="true" && element.deactivated==false) {
              aux.push(element)
            }
          }
        )
        this.lstUsers = aux
      },
      error: error => {
        console.log(error)
      }
    })

  }

  selecionarPerf(pos : string){
    this.page = 1
    this.msg = ""
    this.lstUsers.forEach((element : any) => {
      if(element.id == pos){
        console.log(element.id)
        this._id = element.id
        this.getInfoUser()
      }
    });
  }

  search(){
    //Cuando se ejecute se buscan los vehículos teniendo en cuenta los filtros establecidos
  }
}
