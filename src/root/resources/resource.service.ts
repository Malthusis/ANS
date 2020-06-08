import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import { RootService } from '../root.service';
import { Resource } from '../interface';

export enum TYPES {
  TRASH = 'Trash',
  REFINED = 'Refined Goods',
  BASIC = ''
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
  private heatTick = 0;
  private heatWatcher$$: BehaviorSubject<boolean>;

  constructor(
    private rootService: RootService
  ) {
    const resources = new Map<string, Resource[]>();
    resources.set(TYPES.TRASH, [
      {
        key: 'RUBBISH',
        value: 0,
        max: 25,
        cssStyle: 'rubbish',
        unlockedDefault: true
      },
      {
        key: 'KINDLING',
        value: 0,
        max: 25,
        cssStyle: 'kindling',
        unlockedDefault: true
      },
      {
        key: 'SCRAP',
        value: 0,
        max: 25,
        cssStyle: 'scrap',
        unlockedDefault: true
      },
      {
        key: 'PLASTIC',
        value: 0,
        max: 25,
        cssStyle: 'plastic',
        unlockedDefault: true
      },
      {
        key: 'ELECTRONIC',
        value: 0,
        max: 25,
        cssStyle: 'electronic',
        unlockedDefault: true
      },
      {
        key: 'MEDICAL',
        value: 0,
        max: 25,
        cssStyle: 'medical',
        unlockedDefault: true
      }
    ] as Resource[]);
    resources.set(TYPES.REFINED, [{
      key: 'PCHUNK',
      value: 0,
      max: 50,
      cssStyle: 'pChunk',
      unlockedDefault: false
    }] as Resource[]);
    resources.set(TYPES.BASIC, [{
      key: 'HEAT',
      value: 0,
      max: 50,
      cssStyle: 'heat',
      unlockedDefault: true
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
        this.changeResource(1, trashArray[garbagePick]);

        // Heat Decay
        this.heatTick++;
        const statsArray = resourceMap.get(TYPES.BASIC);
        if (this.heatTick >= 10) {
          this.changeResource(-1, statsArray[0]);
          this.heatTick = 0;
        }

        // console.log('Tick!');
      }
    );
  }

  get resources$(): Observable<Map<string, Resource[]>> {
    return this.resources$$.asObservable();
  }

  pickTrash(): void {
    this.resources$.pipe(
      take(1)
    ).subscribe(resourceMap => {
        // Gather Trash
        const trashArray = resourceMap.get(TYPES.TRASH);
        const garbagePick = this.randomIntFromInterval(0, TRASH_LENGTH - 1);
        this.changeResource(1, trashArray[garbagePick]);
      }
    );
  }

  changeResource(value: number, resource: Resource): boolean {
    if (value < 0) {
      if (resource.value + value < 0) {
        return false;
      }
      resource.value = resource.value + value;
    } else {
      resource.value + value > resource.max ? resource.value = resource.max : resource.value = resource.value + value;
    }
    return true;
  }

  private randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
