import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/classes/trip';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private trip: Trip;
  private peoples: FormArray;
  private tags: FormArray;
  public tripForm: FormGroup;
  public isNew;
  public title;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.data.subscribe(values => {
        this.isNew = values['isNew'];
        this.title = (this.isNew) ? "New Trip" : "Edit Trip";
      })
    )
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const tripId = params.get('id');
        this.trip = this.tripService.getTripById(parseInt(tripId));
        this.createForm();
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private createForm(): void {
    this.tripForm = this.fb.group({
      title: [(!this.isNew) ? this.trip.title : '', [Validators.required]],
      description: [(!this.isNew) ? this.trip.description : '', [Validators.required]],
      time: [(!this.isNew) ? this.trip.time : '', [Validators.required]],
      imageUrl: [(!this.isNew) ? this.trip.imageUrl : '', [Validators.required]],
      peoples: this.fb.array([]),
      tags: this.fb.array([])
    });

    this.peoples = this.tripForm.get('peoples') as FormArray;
    this.tags = this.tripForm.get('tags') as FormArray;

    if (this.trip) {
      this.trip.peoples.forEach(people => {
        this.peoples.push(this.createPeople(people.name, people.description));
      });
      this.trip.tags.forEach(tag => {
        this.tags.push(this.createTag(tag));
      })
    } else {
      this.addPeople();
      this.addTag();
    }
  }

  addPeople(): void {
    this.peoples.push(this.createPeople('', ''));
  }

  addTag(): void {
    this.tags.push(this.createTag(''));
  }

  deleteTag(i: number): void {
    const arrayControl = this.tripForm.controls['tags'] as FormArray;
    arrayControl.removeAt(i);
  }

  deletePeople(i: number): void {
    const arrayControl = this.tripForm.controls['peoples'] as FormArray;
    arrayControl.removeAt(i);
  }

  submitForm(): void {
    if (this.tripForm.valid) {
      const { title, description, time, imageUrl, peoples, tags } = this.tripForm.value;
      const filteredTags = tags.map(item => item.tag);
      if (this.isNew) {
        this.tripService.createTrip(
          title,
          description,
          time,
          imageUrl,
          peoples,
          filteredTags
        );
        this.router.navigate(['']);
      } else {
        this.tripService.updateTrip(
          new Trip(
            {
              id: this.trip.id,
              title,
              description,
              time,
              imageUrl,
              peoples,
              tags: filteredTags
            }
          )
        );
        this.router.navigate([`/trips/${this.trip.id}`]);
      }
    } else {
      console.log('Form Error');
    }
  }

  private createPeople(name: string, description: string): FormGroup {
    return this.fb.group({
      name: [name, [Validators.required]],
      description: [description, [Validators.required]]
    })
  }

  private createTag(tag: string): FormGroup {
    return this.fb.group({
      tag: [tag, [Validators.required]]
    })
  }

  back() {
    this.location.back();
  }

}
