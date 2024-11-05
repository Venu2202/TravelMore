

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
//import { ContactusComponent } from './contactus/contactus.component';
 
export const routes: Routes = [
    {
        path:'',
        redirectTo: '/home',
        pathMatch: 'full'
    },
 
    {
        path:'home',
        component:HomeComponent
    },
 
    {
        path:'about-us',
        component:AboutUsComponent
    },
   
    {
        path:'travel-list',
        component:TravelListComponent
    },
   
   {
    path:'bookingdetails/:id',
    component:BookingDetailsComponent
   }
 
 
];
 