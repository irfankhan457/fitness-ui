import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector:'membership-dialog',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent
],
  template:`

<h2 mat-dialog-title>
 {{data?.id ? 'Edit Membership' : 'Add Membership'}}
</h2>

<mat-dialog-content class="dialog-body">

  <mat-form-field appearance="outline" class="full">
    <mat-label>Name</mat-label>
    <input matInput [(ngModel)]="data.name">
  </mat-form-field>

  <mat-form-field appearance="outline" class="full">
    <mat-label>Price</mat-label>
    <input matInput type="number" [(ngModel)]="data.price">
  </mat-form-field>

  <mat-form-field appearance="outline" class="full">
    <mat-label>Duration (months)</mat-label>
    <input matInput type="number" [(ngModel)]="data.durationInMonths">
  </mat-form-field>

  <mat-form-field appearance="outline" class="full">
    <mat-label>Description</mat-label>
    <textarea matInput rows="3"
      [(ngModel)]="data.description"></textarea>
  </mat-form-field>

</mat-dialog-content>

<mat-dialog-actions align="end">

<button mat-button (click)="close()">
Cancel
</button>

<button mat-raised-button color="primary"
(click)="save()">
Save
</button>

</mat-dialog-actions>

`,
styles:[`

.dialog-body{
display:flex;
flex-direction:column;
gap:15px;
margin-top:10px;
}

.full{
width:100%;
}

`]
})
export class MembershipDialogComponent{

  constructor(
    private dialogRef:MatDialogRef<MembershipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  close(){
    this.dialogRef.close();
  }

  save(){
    this.dialogRef.close(this.data);
  }

}