import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { finalize } from 'rxjs';
import { environment } from '../../environments/environment';

interface Membership {
  id?: number;
  name: string;
  price: number;
  durationInMonths: number;
  description: string;
}

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss']
  // template: `
  // <h2 style="margin:20px">Membership Plans</h2>

  // <!-- Loading -->
  // <div *ngIf="loading" style="margin:20px">
  //   Loading membership plans...
  // </div>

  // <!-- Error -->
  // <div *ngIf="error" style="margin:20px;color:red">
  //   {{error}}
  // </div>

  // <!-- Empty -->
  // <div *ngIf="!loading && memberships.length === 0 && !error" style="margin:20px">
  //   No membership plans available
  // </div>

  // <!-- Membership Cards -->
  // <mat-card *ngFor="let m of memberships" style="margin:10px;padding:15px">
  //     <h3>{{m.name}}</h3>

  //     <p>
  //       <b>Price:</b> ₹{{m.price}}
  //     </p>

  //     <p>
  //       <b>Duration:</b> {{m.durationInMonths}} months
  //     </p>

  //     <p>
  //       {{m.description}}
  //     </p>
  // </mat-card>
  // `
})
export class MembershipComponent implements OnInit {

  memberships: Membership[] = [];
  loading = true;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchMemberships();
  }

  private fetchMemberships(): void {

    const url = `${environment.apiUrl}/memberships`;

    console.log("Calling API:", url);

    this.http
      .get<unknown>(url)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({

      next: (data: unknown) => {
        console.log("API Response:", data);

        // Some backends wrap arrays inside "data" or "content" fields.
        const normalized = Array.isArray(data)
          ? data
          : Array.isArray((data as { data?: unknown[] })?.data)
            ? (data as { data: unknown[] }).data
            : Array.isArray((data as { content?: unknown[] })?.content)
              ? (data as { content: unknown[] }).content
              : [];

        this.memberships = normalized as Membership[];

        if (!Array.isArray(data) && normalized.length === 0) {
          this.error = "Membership API returned an unexpected response format.";
        }
      },

      error: (err) => {
        console.error("API ERROR:", err);

        this.error = "Unable to load membership plans. Check backend URL/response and CORS settings.";
      }

    });
  }

  deleteMembership(id:number){

  if(!confirm("Delete this membership?")) return;

  this.http.delete(`${environment.apiUrl}/memberships/${id}`)
    .subscribe(()=>{
      this.fetchMemberships();
      this.cdr.detectChanges();
    });

}

addMembership(){

  const name = prompt("Membership name?");
  const price = Number(prompt("Price?"));
  const duration = Number(prompt("Duration in months?"));
  const description = prompt("Description?");

  const body = {
    name,
    price,
    durationInMonths: duration,
    description
  };

  this.http.post<Membership>(
    `${environment.apiUrl}/memberships`,
    body
  ).subscribe(newMembership=>{
      this.fetchMemberships();
      this.cdr.detectChanges();
  });

}
editMembership(m:Membership){

  const price =
    Number(prompt("New price:", String(m.price)));

  const body = {...m, price};

  this.http.put<Membership>(
    `${environment.apiUrl}/memberships/${m.id}`,
    body
  ).subscribe(updated=>{
    this.fetchMemberships();
    this.cdr.detectChanges();
  });

}
}