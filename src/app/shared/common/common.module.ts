// angular
import { NgModule } from '@angular/core';
import { CommonModule as CommonAngularModule } from '@angular/common';
// mapas? import { FormsModule } from '@angular/forms';

// framework
// MDB  x x x especifico 
// import { MaterialModule } from '~/app/framework/material/material.module';

// module
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';

const COMPONENTS = [
  LoadingOverlayComponent
];

@NgModule({
  imports: [
    CommonAngularModule
  ],
  declarations: [
    COMPONENTS
  ],
  exports: [
    CommonAngularModule,
    COMPONENTS
  ]
})
export class CommonModule {
}