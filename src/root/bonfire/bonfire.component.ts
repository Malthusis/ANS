import { Component, OnDestroy, OnInit } from '@angular/core';
import { Resource } from '../interface';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { ResourceService } from '../resources/resource.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bonfire',
  templateUrl: './bonfire.component.html',
  styleUrls: ['./bonfire.component.scss']
})
export class BonfireComponent implements OnInit {

  // private subscriptions = Subscription[];

  constructor(
    private resourcesService: ResourceService
  ) {}

  private trashArray$: Observable<Map<string, Resource[]>>;

  ngOnInit(): void {
    this.trashArray$ = this.resourcesService.resources$;

  }

  kindleFire(): void {
    this.trashArray$.pipe(
      take(1)
    ).subscribe( resources => {
        this.resourcesService.changeResource(1, resources.get('')[0]);
      }
    );
  }

  pickTrash(): void {
    this.resourcesService.pickTrash();
  }

  doThing(): void {
    console.log('Pressed!');
  }

}
