import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html'
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

      alert("Login successful");

      // window.location.href="/dashboard";   // 🔥 important change
      this.router.navigate(['/dashboard']);

    },
    error:(err)=>{
      alert("Login failed");
    }
  });

}
  // login() {

  //   const payload = {
  //     email: this.username,
  //     password: this.password
  //   };

  //   this.api.login(payload).subscribe({

  //     next: (res: any) => {

  //       // Save JWT token
  //       localStorage.setItem('token', res.token);

  //       console.log("Login success", res);

  //       // Navigate to dashboard
  //       this.router.navigate(['/dashboard']);

  //     },

  //     error: (err) => {

  //       console.error("Login failed", err);
  //       alert("Invalid username or password");

  //     }

  //   });

  // }

}