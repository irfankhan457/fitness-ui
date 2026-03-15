import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private router: Router) {}

  get showNavbar(): boolean {
    const currentRoute = this.router.url.split('?')[0];
    const token = localStorage.getItem('token');
    const hasToken = !!token && token !== 'null' && token !== 'undefined';

    return hasToken && currentRoute !== '/login' && currentRoute !== '/register';
  }

}