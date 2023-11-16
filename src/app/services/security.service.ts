import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SecurityService {
  theUser = new BehaviorSubject<User>(new User());
  constructor(private http: HttpClient, private router: Router) {}
  /**
   * Permite obtener la información de usuario
   * que tiene la función activa y servirá
   * para acceder a la información del token
   */
  public get activeSessionUser(): User {
    return this.theUser.value;
  }
  /**
   * Permite actualizar la información del usuario
   * que acabó de validarse correctamente
   * @param user información del usuario logueado
   */
  setUser(user: User) {
    this.theUser.next(user);
  }
  /**
   * Permite obtener la información del usuario
   * con datos tales como el identificador y el token
   * @returns
   */
  getUser() {
    return this.theUser.asObservable();
  }
  /**
   * Realiza la petición al backend con el correo y la contraseña
   * para verificar si existe o no en la plataforma
   * @param infoUsuario JSON con la información de correo y contraseña
   * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
   */
  login(infoUsuario: User): Observable<User> {
    return this.http.post<User>(
      `${environment.url_ms_security}/security/login`,
      infoUsuario
    );
  }
  /**
   * Guarda los datos tales como el identificador
   * y token del usuario en una base de datos
   * interna del navegador llamada local storage
   * @param sessionData información del usuario
   * @returns un booleano que indica si la información
   * fue almacenada correctamente
   */
  saveSessionData(sessionData: any) {
    let actualSession = localStorage.getItem("session");
    if (actualSession) {
    } else {
    }

    let data: User = {
      _id: sessionData["_id"],
      token: sessionData["token"],
    };
    localStorage.setItem("session", JSON.stringify(data));
    this.setUser(data);
  }
  /**
   * Permite cerrar la sesión del usuario
   * que estaba previamente logueado
   */
  logout() {
    localStorage.removeItem("session");
    this.setUser(new User());
  }
  /**
   * Verifica si hay una sesion activa
   * @returns
   */
  sesionExiste(): boolean {
    let sesionActual = this.getSessionData();
    return sesionActual ? true : false;
  }
  /**
   * Permite obtener los dato de la sesión activa en el
   * local storage
   * @returns
   */
  getSessionData() {
    let sesionActual = localStorage.getItem("session");
    return sesionActual;
  }

  verifySession() {
    let theSession = this.getSessionData();
    if (theSession) {
      this.setUser(JSON.parse(theSession));
    }
  }
}
