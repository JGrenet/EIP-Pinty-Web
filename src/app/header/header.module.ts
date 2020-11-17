import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HeaderModule {

}
