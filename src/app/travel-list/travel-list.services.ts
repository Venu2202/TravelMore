import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { IBooking } from "./travel-list.model";

@Injectable({
  providedIn: 'root'
})
export class TravelistService {
  private apiUrl = 'api/cities.json'; 

  constructor(private http: HttpClient) {}

  getBooking(): Observable<IBooking[]> {
    return this.http.get<IBooking[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching bookings', error);
        return of([]); 
      })
    );
  }

  getBookingById(id: number): Observable<IBooking | undefined> {
    return this.getBooking().pipe(
      map(destinations => destinations.find(destination => destination.id === id)),
      catchError(error => {
        console.error('Error fetching booking by ID', error);
        return of(undefined); 
      })
    );
  }
}
