import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from './root.component';
import { ResourcesComponent } from './resources/resources.component';
import { RootService } from './root.service';
import { ResourceService } from "./resources/resource.service";
import { BonfireComponent } from './bonfire/bonfire.component';
import { MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    RootComponent,
    ResourcesComponent,
    BonfireComponent
  ],
    imports: [
        BrowserModule,
        MatButtonModule
    ],
  providers: [RootService, ResourceService],
  bootstrap: [RootComponent]
})
export class RootModule { }
