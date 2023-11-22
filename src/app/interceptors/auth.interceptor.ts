import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { SecurityService } from "../services/security.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { catchError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let theUser = this.securityService.activeSessionUser;
    const token = theUser["token"];
    // Si la solicitud es para la ruta de "login", no adjuntes el token
    if (
      request.url.includes("/login") ||
      request.url.includes("/token-validation")
    ) {
      console.log("no se pone token");
      return next.handle(request);
    }
    console.log("colocando token " + token);
    // Adjunta el token a la solicitud
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Continúa con la solicitud modificada
    return next.handle(authRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl("/dashboard");
        } else if (err.status === 400) {
          Swal.fire({
            title: "No tiene permisos",
            icon: "error",
            timer: 5000,
          });
        }

        return new Observable<never>();
      })
    );
  }
}
