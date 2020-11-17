import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandpageModule } from './landpage/landpage.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuardAdminService } from './core/guard/auth-guard-admin.service';

const lazyroutes = [
  // { path: 'map', loadChildren: 'app/map/map.module#MapModule' },
  { path: 'user',  loadChildren: 'app/userProfile/userProfile.module#UserProfileModule'},
  { path: 'place', loadChildren: 'app/placeProfile/placeProfile.module#PlaceProfileModule'},
  { path: 'research', loadChildren: 'app/research/research.module#ResearchModule'},
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuardAdminService]},
  { path: 'around', loadChildren: 'app/aroundMe/aroundMe.module#AroundMeModule'}
];

@NgModule({
  imports: [DashboardModule, LandpageModule, RouterModule.forRoot(lazyroutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
