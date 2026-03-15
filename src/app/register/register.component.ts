import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector:'app-register',
  standalone:true,
  imports:[FormsModule],
  templateUrl:'./register.component.html'
})
export class RegisterComponent{

  email='';
  password='';

  constructor(private api:ApiService,private router:Router){}

  register(){

    const payload={
      email:this.email,
      password:this.password,
      role:'USER'
    }

    this.api.register(payload).subscribe({
      next:(res)=>{
        alert("Registration successful");
        this.router.navigate(['/login']);
      },
      error:(err)=>{
        const message = err?.error?.message || err?.error || "Registration failed";
        alert(message);
      }
    });

  }

}