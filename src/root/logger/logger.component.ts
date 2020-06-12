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
    this.loggerService.addMessage(
      'Bacon ipsum dolor amet ground round salami tenderloin buffalo shankle doner chicken pork belly cupim turkey landjaeger. Venison chislic pork belly cupim. Filet mignon short ribs meatball bacon prosciutto bresaola. Burgdoggen alcatra beef landjaeger, kielbasa fatback tongue venison sirloin turducken short ribs pancetta.');
  }

}
