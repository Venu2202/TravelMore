import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBooking } from '../travel-list/travel-list.model';
import { TravelistService } from '../travel-list/travel-list.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  id: number | undefined;
  destination: IBooking | undefined;
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute, private bookService: TravelistService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((map) => {
      this.id = +map.get('id')!;
      
      this.subscription.add(
        this.bookService.getBookingById(this.id).subscribe((data) => {
          this.destination = data;
        })
      );
    });
  }

  onBack(): void {
    this.router.navigate(['/travel-list']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }
}
