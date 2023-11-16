import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroupValidator: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) {}

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
  login(): void {
    if (this.formGroupValidator.invalid) {
      Swal.fire({
        title: "Formulario Incorrecto",
        icon: "error",
        timer: 3000,
      });
      return;
    }
    let user: User = this.UserData();

    // this.movie = this.movieData();
    // console.log("Creando a " + JSON.stringify(this.movie));
    // this.moviesService.create(this.movie).subscribe((jsonResponse: any) => {
    //   Swal.fire({
    //     title: "Creado",
    //     icon: "success",
    //   });
    //   this.router.navigate(["movies/list"]);
    // });
  }
  ngOnDestroy() {}
}
