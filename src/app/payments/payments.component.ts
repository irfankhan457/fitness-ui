
import {Component} from '@angular/core';
import { MatCard } from "@angular/material/card";

@Component({
selector:'app-payments',
template:`
<mat-card>
<h2>Payments</h2>
<p>Payments module UI.</p>
</mat-card>
`,
styleUrls:['./payments.component.scss'],
imports: [MatCard]
})
export class PaymentsComponent{}
