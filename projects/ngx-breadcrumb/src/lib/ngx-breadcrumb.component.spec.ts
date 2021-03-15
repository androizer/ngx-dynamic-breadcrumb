import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBreadcrumbComponent } from './ngx-breadcrumb.component';

describe('NgxBreadcrumbComponent', () => {
  let component: NgxBreadcrumbComponent;
  let fixture: ComponentFixture<NgxBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
