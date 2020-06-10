import { Component, OnInit } from '@angular/core';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {

  constructor(
    private loggerService: LoggerService
  ) {}

  logQueue$: Observable<string[]>;

  ngOnInit(): void {
    this.logQueue$ = this.loggerService.logConsole$;
    this.loggerService.addMessage('Test!');
  }

}
