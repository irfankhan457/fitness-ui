import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrainersComponent } from './trainers/trainers.component';
import { AuthGuard } from './auth.guard';
import { MembershipComponent } from './membership/membership.component';
import { PaymentsComponent } from './payments/payments.component';
import { BookingComponent } from './booking/booking.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'trainers', component: TrainersComponent, canActivate: [AuthGuard] },

  { path: 'membership', component: MembershipComponent, canActivate: [AuthGuard] },

  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },

  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' }

];