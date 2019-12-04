import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from './root.component';
import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [
    RootComponent,
    ResourcesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
