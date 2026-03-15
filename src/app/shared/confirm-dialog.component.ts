import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>

    <mat-dialog-content>
      <p>{{data.message}}</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">

      <button mat-button (click)="close(false)">
        Cancel
      </button>

      <button mat-raised-button color="warn"
        (click)="close(true)">
        Delete
      </button>

    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  close(result:boolean){
    this.dialogRef.close(result);
  }

}