import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "src/app/models/movie.model";
import { MovieService } from "src/app/services/movie.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  movie: Movie;
  creationMode: boolean;
  formGroupValidator: FormGroup;
  constructor(
    private moviesService: MovieService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.movie = {
      id: 0,
      name: "",
      duration: 0,
      year: "",
    };
    this.creationMode = true;
  }
  formBuilding() {
    this.formGroupValidator = this.formBuilder.group({
      name: [this.movie.name || "", [Validators.required]],
      duration: [
        this.movie.duration || "",
        [Validators.min(1), Validators.max(300), Validators.required],
      ],
      year: [
        this.movie.year || "",
        [
          Validators.required,
          Validators.pattern(
            "/^d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/"
          ),
        ],
      ],
    });
  }
  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
  }
  movieData(): Movie {
    let theMovie = new Movie();
    theMovie.name = this.formGroupValidatorData.name.value;
    theMovie.duration = this.formGroupValidatorData.duration.value;
    theMovie.year = this.formGroupValidatorData.year.value;
    return theMovie;
  }

  ngOnInit(): void {
    this.formBuilding();
    if (this.rutaActiva.snapshot.params.id) {
      this.creationMode = false;
      this.show(this.rutaActiva.snapshot.params.id);
    }
  }
  show(id: number): void {
    this.moviesService.show(id).subscribe((response: Movie) => {
      this.movie = response;
      this.movie.year = this.transformatDate(this.movie.year);
      this.formBuilding();
    });
  }
  create(): void {
    if (this.formGroupValidator.invalid) {
      Swal.fire({
        title: "Formulario Incorrecto",
        icon: "error",
        timer: 3000,
      });
      return;
    }
    this.movie = this.movieData();
    console.log("Creando a " + JSON.stringify(this.movie));
    this.moviesService.create(this.movie).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: "Creado",
        icon: "success",
      });
      this.router.navigate(["movies/list"]);
    });
  }
  update() {
    this.moviesService.update(this.movie).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: "Actualizado",
        icon: "success",
      });
      this.router.navigate(["movies/list"]);
    });
  }
  transformatDate(theDate: string): string {
    const theDateObject = new Date(theDate);
    return `${theDateObject.getFullYear()}-${
      theDateObject.getMonth() + 1
    }-${theDateObject.getDate()}`;
  }
}
