import { Component, OnInit } from '@angular/core';
import { IBooking } from './travel-list.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitiesRatingComponent } from '../cities-rating/cities-rating.component';
import { RouterLink } from '@angular/router';
import { TravelistService } from './travel-list.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, CitiesRatingComponent, RouterLink, ReactiveFormsModule,MatSlideToggleModule]
})
export class TravelListComponent implements OnInit {
  searchTerm: string = '';  
  destinations: IBooking[] = [];
  cityRating: number = 0;
  travelForm: FormGroup;
  isEditing: boolean = false;
  editIndex: number | null = null;
  isModalOpen: boolean = false;
  selectedImage: File | null = null; 
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  selectedDestinationIndex: number | null = null;

  private subscription: Subscription = new Subscription();

  constructor(private _bookService: TravelistService, private fb: FormBuilder) {
    this.travelForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      rating: [0, Validators.required],
      price: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0]; 
  }

  ngOnInit(): void {
    this.subscription.add(
      this._bookService.getBooking().subscribe({
        next: (data) => {
          this.destinations = data;
        },
        error: (err) => {
          console.error('Error fetching bookings:', err);
        },
        complete: () => {
          console.log('Data fetching complete');
        }
      })
    );
  }

  onRatingChange(newRating: number): void {
    this.cityRating = newRating;
  }

  get filteredDestinations() {
    const searchLower = this.searchTerm?.toLowerCase() || '';
    return this.destinations.filter(destination =>
      destination.name.toLowerCase().includes(searchLower) ||  
      destination.location.toLowerCase().includes(searchLower) 
    );
  }

  addOrUpdateDestination() {
    if (this.isEditing) {
      const updatedDestination = {
        ...this.destinations[this.editIndex!],
        ...this.travelForm.value,
        img: this.selectedImage ? URL.createObjectURL(this.selectedImage) : this.destinations[this.editIndex!].img,
      };
      this.destinations[this.editIndex!] = updatedDestination;
    } else {
      const newDestination = {
        ...this.travelForm.value,
        id: this.destinations.length + 1,
        img: this.selectedImage ? URL.createObjectURL(this.selectedImage) : 'default-image-path.jpg', // Replace with a default image path if needed
      };
      this.destinations.push(newDestination);
    }
    this.travelForm.reset();
    this.selectedImage = null; 
    this.closeModal(); 
  }

  editDestination(index: number) {
    this.isEditing = true;
    this.editIndex = index;
    this.travelForm.patchValue(this.destinations[index]);
    this.isEditModalOpen = true; 
  }

  confirmDelete(index: number) {
    this.selectedDestinationIndex = index;
    this.isDeleteModalOpen = true; 
  }

  deleteDestination() {
    if (this.selectedDestinationIndex !== null) {
      this.destinations.splice(this.selectedDestinationIndex, 1);
      this.selectedDestinationIndex = null; 
    }
  }

  addCity() {
    this.travelForm.reset();
    this.isEditing = false;
    this.editIndex = null;
    this.isModalOpen = true; 
  }

  closeModal() {
    this.isModalOpen = false; 
  }

  closeEditModal() {
    this.isEditModalOpen = false; 
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false; 
  }

  updateDestination() {
    if (this.editIndex !== null) {
      const updatedDestination = {
        ...this.destinations[this.editIndex],
        ...this.travelForm.value,
        img: this.selectedImage ? URL.createObjectURL(this.selectedImage) : this.destinations[this.editIndex].img,
      };
      this.destinations[this.editIndex] = updatedDestination;
      this.isEditModalOpen = false; 
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
