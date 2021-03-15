import { TestBed } from '@angular/core/testing';

import { NgxBreadcrumbService } from './ngx-breadcrumb.service';

describe('NgxBreadcrumbService', () => {
  let service: NgxBreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
