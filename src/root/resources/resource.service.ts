import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { RootService } from '../root.service';
import { Resource } from '../interface';

export enum TYPES {
  TRASH = 'Trash',
  REFINED = 'Refined Goods'
}

export enum TRASH {
  RUBBISH = 0,
  KINDLING = 1,
  SCRAP = 2,
  PLASTIC = 3,
  ELECTRONIC = 4,
  MEDICAL = 5
}

export enum REFINED {
  PCHUNK = 0,
}

const TRASH_LENGTH = 6;

@Injectable()
export class ResourceService {

  private resourceGenTicks$: Observable<any>;
  private resources$$: BehaviorSubject<Map<string, Resource[]>>;

  constructor(
    private rootService: RootService
  ) {
    const resources = new Map<string, Resource[]>();
    resources.set(TYPES.TRASH, [
      {
        key: 'RUBBISH',
        name: 'Rubbish',
        value: 0,
        max: 25,
        cssStyle: 'rubbish'
      },
      {
        key: 'KINDLING',
        name: 'Kindling',
        value: 0,
        max: 25,
        cssStyle: 'kindling'
      },
      {
        key: 'SCRAP',
        name: 'Scrap',
        value: 0,
        max: 25,
        cssStyle: 'scrap'
      },
      {
        key: 'PLASTIC',
        name: 'Plastic',
        value: 0,
        max: 25,
        cssStyle: 'plastic'
      },
      {
        key: 'ELECTRONIC',
        name: 'Electronic',
        value: 0,
        max: 25,
        cssStyle: 'electronic'
      },
      {
        key: 'MEDICAL',
        name: 'Medical',
        value: 0,
        max: 25,
        cssStyle: 'medical'
      },
      {
        key: 'HEAT',
        name: 'Heat',
        value: 0,
        max: 50,
        cssStyle: 'heat'
      }
    ] as Resource[]);
    resources.set(TYPES.REFINED, [{
    key: 'PCHUNK',
    name: 'P. Chunk',
    value: 0,
    max: 50,
    cssStyle: 'pChunk'
    }] as Resource[]);
    console.log(resources);

    this.resources$$ = new BehaviorSubject<Map<string, Resource[]>>(resources);

    console.log('test', this.resources$$.getValue());

    this.resourceGenTicks$ = this.rootService.resourceGenTick$;

    this.rootService.resourceGenTick$.pipe(
      withLatestFrom(this.resources$$.asObservable())
    ).subscribe(
      ([_, resourceMap]) => {
        // Gather Trash
        const trashArray = resourceMap.get(TYPES.TRASH);
        const garbagePick = this.randomIntFromInterval(0, TRASH_LENGTH - 1);
        if (trashArray[garbagePick].value < trashArray[garbagePick].max) {
          trashArray[garbagePick].value = trashArray[garbagePick].value + 1;
        }
        // console.log('Tick!');
      }
    );
  }

  get resources$(): Observable<Map<string, Resource[]>> {
    return this.resources$$.asObservable();
  }

  private randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
