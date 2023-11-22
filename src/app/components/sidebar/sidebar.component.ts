import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SecurityService } from "src/app/services/security.service";
import { Subscription } from "rxjs";
import { User } from "src/app/models/user.model";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  type: number;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
    type: 1,
  },
  {
    path: "/icons",
    title: "Icons",
    icon: "ni-planet text-blue",
    class: "",
    type: 1,
  },
  {
    path: "/maps",
    title: "Maps",
    icon: "ni-pin-3 text-orange",
    class: "",
    type: 1,
  },
  {
    path: "/user-profile",
    title: "User profile",
    icon: "ni-single-02 text-yellow",
    class: "",
    type: 2,
  },
  {
    path: "/tables",
    title: "Tables",
    icon: "ni-bullet-list-67 text-red",
    class: "",
    type: 1,
  },
  {
    path: "/login",
    title: "Login",
    icon: "ni-key-25 text-info",
    class: "",
    type: 3,
  },
  {
    path: "/register",
    title: "Register",
    icon: "ni-circle-08 text-pink",
    class: "",
    type: 3,
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  user: User;
  subscription: Subscription;

  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.subscription = this.securityService.getUser().subscribe((data) => {
      this.user = data;
    });
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
