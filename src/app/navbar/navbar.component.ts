import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CommonModule,
RouterModule,
MatToolbarModule,
MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router) {}
  

isLoggedIn(): boolean {
  const token = localStorage.getItem("token");
  return token !== null && token !== '';
}

logout() {
  localStorage.removeItem("token");
  this.router.navigate(['/login']);
  location.reload();
}
}