import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from './root.component';
import { ResourcesComponent } from './resources/resources.component';
import { RootService } from './root.service';
import { ResourceService } from './resources/resource.service';
import { BonfireComponent } from './bonfire/bonfire.component';
import { MatButtonModule, MatDividerModule } from '@angular/material';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BorderComponent } from './border/border.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    RootComponent,
    ResourcesComponent,
    BonfireComponent,
    BorderComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  providers: [RootService, ResourceService],
  bootstrap: [RootComponent]
})
export class RootModule { }
