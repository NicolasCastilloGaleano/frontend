import { Routes } from "@angular/router";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { UnauthenticatedGuard } from "src/app/guards/unauthenticated.guard";

export const AuthLayoutRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [UnauthenticatedGuard],
  },
];
