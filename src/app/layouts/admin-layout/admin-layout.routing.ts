import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { MoviesModule } from "src/app/pages/movies/movies.module";
import { AuthenticatedGuard } from "src/app/guards/authenticated.guard";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthenticatedGuard],
  },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "movies",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/movies/movies.module").then(
            (m) => m.MoviesModule
          ),
      },
    ],
  },
];
