import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/classes/trip';

@Component({
  selector: 'app-show-trip',
  templateUrl: './show-trip.component.html',
  styleUrls: ['./show-trip.component.scss']
})
export class ShowTripComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public trip: Trip;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private location: Location
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.route.paramMap.subscribe(params => {
      const tripId = params.get('id');
      this.trip = this.tripService.getTripById(parseInt(tripId));
      console.log(this.trip);
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  back() {
    this.location.back();
  }

  deleteTrip(): void {
    this.tripService.deleteTrip(this.trip.id);
    this.router.navigate(['']);
  }

}
