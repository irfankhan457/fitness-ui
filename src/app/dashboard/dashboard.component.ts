
import {Component} from '@angular/core';
import { MatCard } from "@angular/material/card";

@Component({
selector:'app-dashboard',
template:`
<mat-card>
<h2>Welcome to Fitness Club Dashboard</h2>
<p>Dashboard module UI.</p>
</mat-card>
`,
imports: [MatCard]
})
export class DashboardComponent{}
