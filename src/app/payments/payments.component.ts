
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

interface Payment {
  id?: number;
  name: string;
}

@Component({
  selector:'app-payments',
  templateUrl: './payments.component.html',
  styleUrls:['./payments.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatTableModule,
    MatFormFieldModule
]
})
export class PaymentsComponent implements OnInit {
  paymentForm: FormGroup;
  payments: Payment[] = [];
  displayedColumns: string[] = ['id', 'name'];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.apiService.getPayments().subscribe({
      next: (data) => {
        this.payments = data;
      },
      error: (err) => {
        this.snackBar.open('Failed to load payments', 'Close', { duration: 3000 });
        console.error('Error loading payments:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.apiService.createPayment(this.paymentForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Payment created successfully', 'Close', { duration: 3000 });
          this.paymentForm.reset();
          this.loadPayments();
        },
        error: (err) => {
          this.snackBar.open('Failed to create payment', 'Close', { duration: 3000 });
          console.error('Error creating payment:', err);
        }
      });
    }
  }
}
