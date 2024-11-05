import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cities-rating.component.html',  
  styleUrls: ['./cities-rating.component.css']    
})
export class CitiesRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  getStarClass(index: number): string {
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating % 1 > 0; 

    if (index < fullStars) {
      if (this.rating >= 3.9) {
        return 'text-success'; 
      } else if (this.rating > 2.9) {
        return 'text-warning'; 
      } else {
        return 'text-danger'; 
      }
    }
    if (index === fullStars && hasHalfStar) {
      return 'text-success-half'; 
    }
    return 'text-secondary'; 
  }

  onStarClick(index: number): void {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating); 
  }

  
}
