import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';




@Injectable()
export class GameFlagsService {

  private initialStage$$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor() {
  }

  get initialStage$(): Observable<number> {
    return this.initialStage$$.asObservable();
  }

  // warm self by fire
  advanceToStage1(): void {
    this.initialStage$$.next(2);
  }

  save(): any[] {
    return [this.initialStage$$.getValue()];
  }

  load(saved: any[]): void {
    this.initialStage$$.next(saved[0]);
  }
}
