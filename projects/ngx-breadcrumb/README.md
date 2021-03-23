# Angular Dynamic Breadcrumb
## Installation
```shell
npm install ngx-dynamic-breadcrumb
```
### 1. Import the `NgxBreadcrumbModule`

Import `NgxBreadcrumbModule` in the `NgModule` of your application's root module.
```typescript
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {NgxBreadcrumbModule} from 'angular-crumbs';

@NgModule({
    imports: [
        BrowserModule,
        NgxBreadcrumbModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
```

### 2. Set breadcrumbs in `app.routes`
```typescript
export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', ..., data: { breadcrumb: 'Login'}},
    {path: 'profile', ..., data: { breadcrumb: {key: 'profile', label: 'Profile'}}},
    {path: 'roles', ..., data: { breadcrumb: 'Roles'}},
    {path: 'vendors', ..., data: {breadcrumb: {key: 'vendors', label: 'Vendors'}}},
        children: [
            {path: ':org', ..., data: { breadcrumb: 'Repo List'}},
            {path: ':repo', ..., data: { breadcrumb: 'Repo'}},
        }],
    },
];
```
> Note: If breadcrumb is supplied as string, then the string value acts as `key` & `label` for that particular breadcrumb.

### 3. Add `<ngx-breadcrumb></ngx-breadcrumb>` tag in template of your application component.


# Customization
## Template  Customization
### You can BYO template using the breadcrumb's ng-content transclude.
```typescript
<ngx-breadcrumb class="ngx-dynamic-breadcrumb">
  <ng-content let-breadcrumb let-isLast let-breadcrumbs>
    <a
    href="typescript:void(0)"
    *ngIf="!isLast && breadcrumb.isClickable"
    (click)="navigateTo(breadcrumb.url)"
    >
      {{ breadcrumb.label }}
    </a>
    <span
      *ngIf="isLast || !breadcrumb.isClickable"
      [ngClass]="{'breadcrumb-item-last': isLast && breadcrumbs.length > 1}"
      >
      {{ breadcrumb.label }}
    </span>
  </ng-content>
</ngx-breadcrumb>
```

## Dynamic Breadcrumbs
Use `NgxBreadcrumbService` to edit/replace the breadcrumb per route object dynamically
#### 1. Edit/replace the breadcrumb
```typescript
ngOnInit(): void {
  ...
  this.getServiceDetails(this.serviceId).subscribe(repoDetails => {
        ...
        this.breadcrumbService.breadcrumbReplace$.next({
          key: 'keyToObject',
          newLabel: 'New Label',
          newUrl: 'New URL value (optional)', // Provide this option only when needs to update url.
        });

  });
  ...
}
```

### 2. Restrict a particular breadcrumb to render onto the UI by providing `newLabel` as `null` value.
```typescript
ngOnInit(): void {
  ...      
  this.getServiceDetails(this.serviceId).subscribe(repoDetails => {
        ...
        this.breadcrumbService.breadcrumbReplace$.next({
          key: 'keyToObject',
          newLabel: null, // this will remove breadcrumb from UI.
        });

  });
  ...
}
```

# License
[MIT](/projects/ngx-breadcrumb/LICENSE)
