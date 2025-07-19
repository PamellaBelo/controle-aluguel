import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GestaoDespesas } from '../../pages/gestao-despesas/gestao-despesas';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']

})
export class Sidebar implements OnInit {
  activeRoute: string = '';
  sidebarVisible = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute = event.urlAfterRedirects;
      });
  }

  goHome() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }

  goTo(route: string) {
    this.activeRoute = route;
    this.router.navigate([route]);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
