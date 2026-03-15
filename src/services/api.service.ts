import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({providedIn:'root'})
export class ApiService {
  get<T>(arg0: string) {
    throw new Error('Method not implemented.');
  }

   baseUrl = environment.apiUrl;

  constructor(private http:HttpClient){}

//   login(username:string,password:string){
//     return this.http.post(this.baseUrl+"/login",{username,password});
//   }

//   getTrainers(){
//     return this.http.get(this.baseUrl+"/trainers");
//   }

//   getMembership(){
//     return this.http.get(this.baseUrl+"/membership");
//   }
  login(data:any){
    return this.http.post(`${this.baseUrl}/auth/login`,data);
  }

  register(data:any){
    return this.http.post(`${this.baseUrl}/auth/register`,data);
  }

  getTrainers(){
    return this.http.get(`${this.baseUrl}/trainers`);
  }

  getMemberships(){
    return this.http.get<any[]>(`${this.baseUrl}/memberships`);
  }

  getMembership(){
    return this.http.get<any>(`${this.baseUrl}/memberships`);
  }
  

addTrainer(trainer:any){
  return this.http.post(`${this.baseUrl}/trainers`,trainer);
}

deleteTrainer(id:number){
  return this.http.delete(`${this.baseUrl}/trainers/${id}`);
}

updateTrainer(id:number,trainer:any){
  return this.http.put(`${this.baseUrl}/trainers/${id}`,trainer);
}

}