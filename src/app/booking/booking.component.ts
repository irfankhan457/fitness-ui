
import {Component} from '@angular/core';
import { MatCard } from "@angular/material/card";

@Component({
selector:'app-booking',
template:`
<mat-card>
<h2>Booking</h2>
<p>Booking module UI.</p>
</mat-card>
`,
imports: [MatCard]
})
export class BookingComponent{}
