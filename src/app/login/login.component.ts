import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private api: ApiService, private router: Router) {}
login(){

  const payload={
    email:this.username,
    password:this.password
  };

  this.api.login(payload).subscribe({
    next:(res:any)=>{

      localStorage.setItem("token",res.token);

      //alert("Login successful");
      this.router.navigate(['/dashboard']);

    },
    error:(err)=>{
      alert("Login failed");
    }
  });

}

}