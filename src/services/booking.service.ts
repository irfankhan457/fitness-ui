import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Booking {
  id?: number;
  trainerId: number;
  trainerName?: string;
  sessionDate: string;
  sessionTime: string;
  duration: number;
  status?: string;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private api = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.api);
  }

  getById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.api}/${id}`);
  }

  create(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.api, booking);
  }

  update(id: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.api}/${id}`, booking);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getByUserId(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.api}/user/${userId}`);
  }
}
