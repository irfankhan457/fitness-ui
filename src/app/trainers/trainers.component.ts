import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCard } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
 selector:'app-trainers',
 standalone:true,
 imports: [MatTableModule,
  CommonModule, FormsModule, MatCard, 
  MatFormField, MatLabel, MatInputModule, MatButtonModule, MatFormFieldModule],
 templateUrl:'./trainers.component.html',
 styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit{

 trainers:any[]=[];
 trainerName='';
 private nextTempId = -1;
 displayedColumns: string[] = ['id','name','action'];

 constructor(
   private api:ApiService,
   private zone: NgZone,
   private cdr: ChangeDetectorRef
 ){}

  ngOnInit(){
    this.loadTrainers();
  }

 loadTrainers(){
   this.api.getTrainers().subscribe((data:any)=>{
     this.zone.run(() => {
       this.trainers = Array.isArray(data) ? [...data] : [];
       this.cdr.detectChanges();
     });
   })
 }

 addTrainer(){

   const name = this.trainerName.trim();

   if(!name) return;

    const tempId = this.nextTempId--;
    const optimisticTrainer = { id: tempId, name };

    this.zone.run(() => {
      this.trainers = [optimisticTrainer, ...this.trainers];
      this.trainerName='';
      this.cdr.detectChanges();
    });

    const payload={
      name
    };

    this.api.addTrainer(payload).subscribe((created:any)=>{
      this.zone.run(() => {
        this.trainers = this.trainers.map((trainer) =>
          trainer.id === tempId
            ? {
                id: created?.id ?? tempId,
                name: created?.name ?? name
              }
            : trainer
        );
        this.cdr.detectChanges();
      });
    }, () => {
      this.zone.run(() => {
        this.trainers = this.trainers.filter((trainer) => trainer.id !== tempId);
        this.trainerName = name;
        this.cdr.detectChanges();
      });
      alert('Unable to add trainer. Please try again.');
    });
 }

 deleteTrainer(id:number){
   const index = this.trainers.findIndex((trainer) => trainer.id === id);

   if (index === -1) {
     return;
   }

   const removedTrainer = this.trainers[index];

   this.zone.run(() => {
     this.trainers = this.trainers.filter((trainer) => trainer.id !== id);
     this.cdr.detectChanges();
   });

   this.api.deleteTrainer(id).subscribe({
    error: () => {
      this.zone.run(() => {
        const restored = [...this.trainers];
        restored.splice(index, 0, removedTrainer);
        this.trainers = restored;
        this.cdr.detectChanges();
      });
      alert('Unable to delete trainer. Please try again.');
    }
   });
 }

}