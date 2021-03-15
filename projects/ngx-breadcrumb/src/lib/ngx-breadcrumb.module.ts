import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxBreadcrumbComponent } from './ngx-breadcrumb.component';
import { NgxBreadcrumbService } from './ngx-breadcrumb.service';

@NgModule({
  declarations: [NgxBreadcrumbComponent],
  imports: [BrowserModule],
  providers: [NgxBreadcrumbService],
  exports: [NgxBreadcrumbComponent],
})
export class NgxBreadcrumbModule {}
