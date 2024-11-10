import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddSemComponent } from './comp/add-sem/add-sem.component';
import { seminar } from './classes/seminar';
// import { CoursesComponent } from './copms/courses/courses.component';
import { NavComponent } from './components/nav/nav.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppComponenttComponent } from './components/app-componentt/app-componentt.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalComponent } from './components/personal/personal.component';
import { ConfirmationdemoComponent } from './components/confirmationdemo/confirmationdemo.component';
import { PaymentdemoComponent } from './components/paymentdemo/paymentdemo.component';
import { PersonaldemoComponent } from './components/personaldemo/personaldemo.component';
import { SeatdemoComponent } from './components/seatdemo/seatdemo.component';
import { AllTripsComponent } from './components/all-trips/all-trips.component';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { AreaPersonalComponent } from './components/area-personal/area-personal.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  // { path: '/', component: HomeComponent },
  { path: 'Nav', component: NavComponent },
  { path: 'NavBar', component: NavBarComponent },
  { path: 'AppComponentt', component: AppComponenttComponent },
  { path: 'Home', component: HomeComponent },
  {
    path: 'signal', component: SignInComponent, children: [
      { path: 'personal', component: PersonaldemoComponent },
      { path: 'confirmation', component: ConfirmationdemoComponent },
      { path: 'payment', component: PaymentdemoComponent },
      { path: 'seat', component: SeatdemoComponent },
    ]
  },

  {
    path: 'trips', component: AllTripsComponent,  },
  { path: 'SingleTrip/:id', component: SingleTripComponent,children: [
    { path: 'Tickets/:id', component: TicketsComponent },
  ] },
  { path: 'area-personal', component: AreaPersonalComponent },
  { path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
