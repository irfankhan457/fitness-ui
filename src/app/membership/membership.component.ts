import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MembershipService, Membership } from '../../services/membership.service';
import { MembershipDialogComponent } from './membership-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';


@Component({
  selector:'app-membership',
  standalone:true,
  imports:[
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
],
  template: `
<div class="page">

  <div class="header">
    <h2>Membership Plans</h2>

    <button mat-raised-button color="primary"
      (click)="openAddDialog()">
      Add Membership
    </button>
  </div>

  <div class="grid">

    <mat-card class="membership-card"
      *ngFor="let m of memberships">

      <mat-card-title>
        {{m.name}}
      </mat-card-title>

      <mat-card-content>

        <p class="price">
          ₹{{m.price}}
        </p>

        <p>
          Duration: {{m.durationInMonths}} months
        </p>

        <p class="desc">
          {{m.description}}
        </p>

      </mat-card-content>

      <mat-card-actions align="end">

        <button mat-stroked-button color="primary"
          (click)="openEditDialog(m)">
          Edit
        </button>

        <button mat-stroked-button color="warn"
          (click)="deleteMembership(m.id!)">
          Delete
        </button>

      </mat-card-actions>

    </mat-card>

  </div>

</div>
`,
styles:[`

.page{
padding:30px;
background:#f5f5f5;
min-height:100vh;
}

.header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:20px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
gap:20px;
}

.membership-card{
padding:15px;
border-radius:10px;
transition:0.2s;
}

.membership-card:hover{
transform:translateY(-4px);
box-shadow:0 6px 18px rgba(0,0,0,0.15);
}

.price{
font-size:22px;
font-weight:bold;
color:#2e7d32;
margin-bottom:10px;
}

.desc{
color:#555;
margin-top:10px;
}

`]
})
export class MembershipComponent implements OnInit{

  memberships:Membership[]=[];

  constructor(
    private service:MembershipService,
    private dialog:MatDialog,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.loadMemberships();
  }

  loadMemberships(){
    this.service.getAll().subscribe(res=>{
      this.memberships = res;
      this.cdr.detectChanges();
    });
  }

  openAddDialog(){

    const dialogRef=this.dialog.open(
      MembershipDialogComponent,
      {width:'400px',data:{}}
    );

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.service.create(result)
          .subscribe((created)=>{
            if (created) {
              this.memberships = [created, ...this.memberships];
            }
            this.cdr.detectChanges();
            this.loadMemberships();
          });
      }
    });
  }

  openEditDialog(m:Membership){

    const dialogRef=this.dialog.open(
      MembershipDialogComponent,
      {width:'400px',data:{...m}}
    );

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.service.update(m.id!,result)
          .subscribe((updated)=>{
            this.memberships = this.memberships.map(item =>
              item.id === m.id ? updated : item
            );
            this.cdr.detectChanges();
            this.loadMemberships();
          });
      }
    });
  }

  // deleteMembership(id:number){

  //   if(confirm("Delete membership?")){
  //     this.service.delete(id)
  //       .subscribe(()=>{
  //         this.memberships = this.memberships.filter(m => m.id !== id);
  //         this.cdr.detectChanges();
  //         this.loadMemberships();
  //       });
  //   }

  // }
  deleteMembership(id:number){

  const dialogRef = this.dialog.open(
    ConfirmDialogComponent,
    {
      width: '350px',
      data: { message: 'Are you sure you want to delete this membership?' }
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if(result){
      this.service.delete(id)
        .subscribe(()=> this.loadMemberships());
    }

  });

}

}