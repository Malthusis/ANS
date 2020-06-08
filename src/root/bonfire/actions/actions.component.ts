import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../resources/resource.service';
import { Observable } from 'rxjs';
import { Resource } from '../../interface';
import { take } from 'rxjs/operators';
import { GameFlagsService } from '../../game-flags/game-flags.service';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  constructor(
    private resourcesService: ResourceService,
    private gameFlagsService: GameFlagsService
  ) {}

  private resources$: Observable<Map<string, Map<string, Resource>>>;
  gameProgress$: Observable<number>;

  ngOnInit(): void {
    this.resources$ = this.resourcesService.resources$;
    this.gameProgress$ = this.gameFlagsService.initialStage$;

  }

  kindleFire(): void {
    this.resources$.pipe(
      take(1)
    ).subscribe( resources => {
        this.resourcesService.changeResource(1, resources.get('').get('HEAT'));
      }
    );
  }

  pickTrash(): void {
    this.resourcesService.pickTrash();
  }
}
