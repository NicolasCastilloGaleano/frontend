import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Movie } from "src/app/models/movie.model";
import { MovieService } from "src/app/services/movie.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  movies: Movie[];
  constructor(private moviesService: MovieService, private router: Router) {}

  ngOnInit(): void {
    // aqui todo lo que se quiera hacer cuando se inicie el componente
    this.moviesService
      .list()
      .subscribe((response: any) => (this.movies = response.data));
  }

  create() {
    this.router.navigate(["movies/create"]);
  }

  edit(id: number) {
    this.router.navigate(["movies/update/" + id]);
    console.log("Editando a " + id);
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar",
      text: "Está seguro que quiere eliminar la película?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.moviesService.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "Eliminación culminada exitosamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
