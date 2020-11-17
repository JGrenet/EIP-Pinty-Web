import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

/* TODO Erreur à la compilation de prod sur le header-cmp */

/* SharedModule */
import { SharedModule } from '../shared/shared.module';

/* Module's Modules */

import { LoginOpt, SocialLoginModule} from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

/* Module's Components */
import { LandPageComponent } from './landpage.component';

/* Module's Routing */
import { LandpageRoutingModule } from './landpage-routing.module';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};

const config = new AuthServiceConfig([
 /* {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('952511250474-h2j7soskkrdod3oebibjepeo6loo1b65.apps.googleusercontent.com', googleLoginOptions)
  },*/
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookUrl)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [ SharedModule, HttpClientModule, ReactiveFormsModule, LandpageRoutingModule, SocialLoginModule],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  declarations: [LandPageComponent],
})

export class LandpageModule {}
