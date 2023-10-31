import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/models/movie.model";
import { MovieService } from "src/app/services/movie.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  movies: Movie[];
  constructor(private moviesService: MovieService) {}

  ngOnInit(): void {
    // aqui todo lo que se quiera hacer cuando se inicie el componente
    console.log("hola");
    this.moviesService
      .list()
      .subscribe((response: any) => (this.movies = response.data));
  }
  edit(id: number) {
    console.log("Editando a " + id);
  }
  delete(id: number) {
    console.log("Eliminando a " + id);
  }
}
