import { Injectable } from '@angular/core';
import { IPeople } from '../interfaces/people';
import { Trip } from '../classes/trip';
import * as TripData from '../../data.json';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private trips: Trip[] = [];

  constructor() {
    (<any>TripData).trips.forEach(trip => {
      this.trips.push(new Trip(trip));
    });
  }

  public getTrips(): Trip[] {
    return this.trips;
  }

  public getTripById(id: number): Trip {
    return _.find(this.trips, (trip) => trip.id === id);
  }

  public createTrip(
    title: string,
    description: string,
    time: string,
    imageUrl: string,
    peoples: IPeople[],
    tags: string[]
  ) {
    const newTripData = {
      id: this.getNextId(),
      title,
      description,
      time,
      imageUrl,
      peoples: [...peoples],
      tags: [...tags]
    };

    const newTrip = new Trip(newTripData);
    this.trips.push(newTrip);
    return newTrip;
  }

  public updateTrip(trip : Trip) : Trip {
    const tripIndex = _.findIndex(this.trips, (t) => t.id === trip.id);
    this.trips[tripIndex] = trip;
    return trip;
  }

  public deleteTrip(id: number): void {
    let tripIndex = _.findIndex(this.trips, (t) => t.id === id);
    if (tripIndex !== -1){
      this.trips.splice(tripIndex, 1);
    }
  }

  private getNextId(): number {
    const max = _.maxBy(this.trips, (trip) => trip.id);
    return max.id + 1;
  }

}
