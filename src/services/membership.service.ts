import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Membership {
  id?: number;
  name: string;
  price: number;
  durationInMonths: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private api = `${environment.apiUrl}/memberships`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Membership[]> {
    return this.http.get<Membership[]>(this.api);
  }

  create(m: Membership): Observable<Membership> {
    return this.http.post<Membership>(this.api, m);
  }

  update(id:number,m:Membership){
    return this.http.put<Membership>(`${this.api}/${id}`,m);
  }

  delete(id:number){
    return this.http.delete(`${this.api}/${id}`);
  }

}