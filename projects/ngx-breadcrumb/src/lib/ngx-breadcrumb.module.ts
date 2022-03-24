import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxBreadcrumbComponent } from './ngx-breadcrumb.component';
import { NgxBreadcrumbService } from './ngx-breadcrumb.service';

@NgModule({
  declarations: [NgxBreadcrumbComponent],
  imports: [CommonModule, RouterModule],
  exports: [NgxBreadcrumbComponent],
})
export class NgxBreadcrumbModule {
  public static forRoot(): ModuleWithProviders<NgxBreadcrumbModule> {
    return {
      ngModule: NgxBreadcrumbModule,
      providers: [NgxBreadcrumbService],
    };
  }
}
