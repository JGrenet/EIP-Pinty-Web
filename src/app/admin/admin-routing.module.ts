import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardAdminService } from '../core/guard/auth-guard-admin.service';
import { UsersComponent } from './users/users.component';
import { PlacesComponent } from './places/places.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import {ReviewsComponent} from './reviews/reviews.component';

const routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardAdminService],
    children: [
      { path: '', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UsersComponent},
      { path: 'places', component: PlacesComponent},
      { path: 'feedbacks', component: FeedbacksComponent},
      { path: 'reviews', component: ReviewsComponent}
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
