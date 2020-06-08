import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../resources/resource.service';
import { Observable } from 'rxjs';
import { Resource } from '../../interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

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
  //
  // doThing(): void {
  //   console.log('Pressed!');
  // }

}
