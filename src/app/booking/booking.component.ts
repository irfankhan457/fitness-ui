
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BookingService, Booking } from '../../services/booking.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    FormsModule,
    MatCard,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookings: Booking[] = [];
  trainers: any[] = [];
  loading = false;
  
  newBooking: Booking = {
    trainerId: 0,
    sessionDate: '',
    sessionTime: '',
    duration: 60
  };

  displayedColumns: string[] = ['id', 'trainer', 'date', 'time', 'duration', 'status', 'actions'];

  constructor(
    private bookingService: BookingService,
    private apiService: ApiService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTrainers();
    this.loadBookings();
  }

  loadTrainers() {
    this.apiService.getTrainers().subscribe((data: any) => {
      this.zone.run(() => {
        this.trainers = Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      });
    }, (error) => {
      console.error('Error loading trainers:', error);
    });
  }

  loadBookings() {
    this.loading = true;
    console.log('Loading bookings from:', this.bookingService['api']);
    
    this.bookingService.getAll().subscribe((data: Booking[]) => {
      console.log('Bookings loaded:', data);
      this.zone.run(() => {
        this.bookings = Array.isArray(data) ? [...data] : [];
        // Enrich bookings with trainer names
        this.bookings.forEach(booking => {
          const trainer = this.trainers.find(t => t.id === booking.trainerId);
          if (trainer) {
            booking.trainerName = trainer.name;
          }
        });
        this.loading = false;
        this.cdr.detectChanges();
      });
    }, (error) => {
      console.error('Error loading bookings:', error);
      console.error('Error status:', error.status);
      console.error('Error details:', error.error);
      this.zone.run(() => {
        this.loading = false;
        this.cdr.detectChanges();
      });
    });
  }

  isFormValid(): boolean {
    return this.newBooking.trainerId > 0 &&
           this.newBooking.sessionDate !== '' &&
           this.newBooking.sessionTime !== '' &&
           this.newBooking.duration > 0;
  }

  bookSession() {
    if (!this.isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    const bookingData = { ...this.newBooking };
    
    console.log('Attempting to book session with data:', bookingData);
    console.log('API endpoint:', this.bookingService['api']);

    this.bookingService.create(bookingData).subscribe(
      (created: Booking) => {
        console.log('Booking created successfully:', created);
        this.zone.run(() => {
          // Add trainer name
          const trainer = this.trainers.find(t => t.id === created.trainerId);
          if (trainer) {
            created.trainerName = trainer.name;
          }
          this.bookings = [created, ...this.bookings];
          this.resetForm();
          this.cdr.detectChanges();
          alert('Session booked successfully!');
        });
      },
      (error) => {
        console.error('Error booking session:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error details:', error.error);
        
        let errorMessage = 'Failed to book session. ';
        if (error.status === 0) {
          errorMessage += 'Cannot connect to server. Please check if the booking service is running on port 8083.';
        } else if (error.status === 404) {
          errorMessage += 'Booking endpoint not found. Check API Gateway routing.';
        } else if (error.status === 500) {
          errorMessage += 'Server error: ' + (error.error?.message || 'Internal server error');
        } else {
          errorMessage += 'Error: ' + (error.error?.message || error.message || 'Please try again.');
        }
        
        alert(errorMessage);
      }
    );
  }

  rescheduleBooking(booking: Booking) {
    // Populate form with existing booking data for rescheduling
    this.newBooking = {
      trainerId: booking.trainerId,
      sessionDate: booking.sessionDate,
      sessionTime: booking.sessionTime,
      duration: booking.duration
    };
    
    alert('Update the details below and click "Book Session" to reschedule');
    
    // After user updates, they can delete the old one
    // Or implement a proper reschedule API endpoint
  }

  cancelBooking(id: number) {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    this.bookingService.cancel(id).subscribe(
      () => {
        this.zone.run(() => {
          this.bookings = this.bookings.filter(b => b.id !== id);
          this.cdr.detectChanges();
          alert('Booking cancelled successfully');
        });
      },
      (error) => {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking. Please try again.');
      }
    );
  }

  resetForm() {
    this.newBooking = {
      trainerId: 0,
      sessionDate: '',
      sessionTime: '',
      duration: 60
    };
  }
}
