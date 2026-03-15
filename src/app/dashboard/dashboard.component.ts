
import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
selector:'app-dashboard',
templateUrl:'./dashboard.component.html',
styleUrls:['./dashboard.component.scss'],
imports: [MatTableModule,
    CommonModule, FormsModule, MatCard,
    MatInputModule, MatButtonModule, MatFormFieldModule]
})
export class DashboardComponent{}
