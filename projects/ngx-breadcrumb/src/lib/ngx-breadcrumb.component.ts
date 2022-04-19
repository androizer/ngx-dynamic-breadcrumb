import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { NgxBreadcrumbService } from './ngx-breadcrumb.service';
import { IBreadcrumb } from './ngx-breadcrumb.types';

@Component({
  selector: 'ngx-breadcrumb',
  templateUrl: './ngx-breadcrumb.component.html',
  styleUrls: ['./ngx-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxBreadcrumbComponent implements OnInit {

  @Input()
  breadcrumbTemplate: TemplateRef<IBreadcrumb> | null = null;

  breadcrumbs$: Observable<IBreadcrumb[]> | null = null;

  constructor(
    private readonly router: Router,
    private readonly service: NgxBreadcrumbService
  ) {}

  ngOnInit(): void {
    this.breadcrumbs$ = this.service.breadcrumbChanges;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
