import { Component, OnInit } from '@angular/core';
import { Resource } from '../interface';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  constructor(
    private resourcesService: ResourceService
  ) {}

  trashArray$: Observable<Map<string, Resource[]>>;

  ngOnInit(): void {
    this.trashArray$ = this.resourcesService.resources$;
  }

}
