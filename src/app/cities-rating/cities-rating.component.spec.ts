import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesRatingComponent } from './cities-rating.component';

describe('CitiesRatingComponent', () => {
  let component: CitiesRatingComponent;
  let fixture: ComponentFixture<CitiesRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitiesRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitiesRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
