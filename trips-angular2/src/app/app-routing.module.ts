import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditTripComponent } from './pages/edit-trip/edit-trip.component';
import { ShowTripComponent } from './pages/show-trip/show-trip.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trips', component: HomeComponent },
  { path: 'trips/new', component: EditTripComponent, data: {isNew : true} },
  { path: 'trips/edit/:id', component: EditTripComponent, data: {isNew : false} },
  { path: 'trips/:id', component: ShowTripComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
