import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private http: HttpClient) {}
  list(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.url_ms_cinema}/movies`);
  }
  show(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${environment.url_ms_cinema}/movies/` + id);
  }
  create(newMovie: Movie) {
    // se elimina el id de la pelicula (solo se hace en la creacion), con el fin de evitar que se entienda que el valor por defecto es el enviado
    delete newMovie.id;
    return this.http.post(`${environment.url_ms_cinema}/movies`, newMovie);
  }
  update(newMovie: Movie) {
    return this.http.put(
      `${environment.url_ms_cinema}/movies/${newMovie.id}`,
      newMovie
    );
  }
  delete(id: number) {
    return this.http.delete(`${environment.url_ms_cinema}/movies/${id}`);
  }
}
