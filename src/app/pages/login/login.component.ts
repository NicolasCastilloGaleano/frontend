import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { SecurityService } from "src/app/services/security.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroupValidator: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private service: SecurityService) {}

  ngOnInit() {
    this.formBuilding();
  }
  formBuilding() {
    this.formGroupValidator = this.formBuilder.group({
      // email: [this.user.email || "", [Validators.required,Validators.email]],
      email: ["", [Validators.required, Validators.email]],
      // password: [
      //   this.user.password || "",
      //   [Validators.minLength(2), Validators.required],
      // ],
      password: ["", [Validators.minLength(2), Validators.required]],
    });
  }
  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
  }
  UserData(): User {
    let theUser = new User();
    theUser.email = this.formGroupValidatorData.email.value;
    theUser.password = this.formGroupValidatorData.password.value;
    return theUser;
  }
  login() {
    if (this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      });
      return false;
    }
    let user = this.UserData()
    this.service.login(user).subscribe({
      next: (data) => {
        console.log("llamando")
        console.log("resultado del login " + data)
        this.getUserFromToken(data)
        
        this.getUserFromToken(data)
        this.router.navigate(['pages/dashboard']);
        this.service.saveSessionData(data);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña inválido',
          icon: 'error',
          timer: 5000
        });
      }
    }
    );
  }
  getUserFromToken(token: string) {
    this.service.getUserFromToken(token).subscribe({
      next:user=>{
        console.log(user)
        let finalData={
          "_id": user["_id"],
          "name":user["name"],
          "email":user["email"],
          token,
          "role":user["role"]
        }
      }
    })
  }

 
  ngOnDestroy() {}
}
