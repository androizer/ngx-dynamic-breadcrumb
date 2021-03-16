import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IBreadcrumb, IReplaceBreadcrumb } from './ngx-breadcrumb.types';

@Injectable()
export class NgxBreadcrumbService {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this._subscribeToRouteEvent();
  }

  private breadcrumbs: IBreadcrumb[] = [];

  private readonly _breadcrumbUpdate$ = new Subject<IBreadcrumb[]>();

  /**
   * Emit change when the breadcrumbs are changed.
   */
  readonly breadcrumbUpdate$ = this._breadcrumbUpdate$.asObservable();

  /**
   * Replace the breadcrumb label and url dynamically.
   * If the label is null while replacing, it will act
   * as delete breadcrumb from UI.
   */
  readonly breadcrumbReplace$ = new Subject<IReplaceBreadcrumb[]>();

  /**
   * Recursively build breadcrumb according to activated route.
   * @param route activate route object
   * @param url parent url
   * @param breadcrumbs array of current breadcrumbs
   */
  buildBreadCrumb(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: IBreadcrumb[] = []
  ): IBreadcrumb[] {
    // If no routeConfig is available we are on the root path
    let label, key;
    let isClickable = true;
    const currentBreadcrumb = route.routeConfig?.data?.breadcrumb;
    if (typeof currentBreadcrumb === 'object') {
      key = currentBreadcrumb?.key;
      label = currentBreadcrumb?.label;
      isClickable = currentBreadcrumb?.isClickable ?? isClickable;
    } else if (typeof currentBreadcrumb === 'string') {
      key = label = currentBreadcrumb;
    }
    let path = currentBreadcrumb ? route.routeConfig?.path : '';

    // If the route is dynamic route such as ':id', replace it with actual param values
    const dynamicRouteParts = path!
      .split('/')
      .filter((el) => el.startsWith(':'));
    if (dynamicRouteParts.length && !!route.snapshot) {
      dynamicRouteParts.forEach((item) => {
        const paramName = item.split(':')[1];
        path = path!.replace(item, route.snapshot.params[paramName]);
      });
    }

    // In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const newBreadcrumbs = [...breadcrumbs];

    if (label) {
      const breadcrumb: IBreadcrumb = {
        key,
        label,
        url: nextUrl,
        isClickable,
      };

      // Only adding route with non-empty label
      newBreadcrumbs.push(breadcrumb);
    }

    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcrumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  // private functions
  private _subscribeToRouteEvent() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
        this._breadcrumbUpdate$.next(this.breadcrumbs);
      });
  }
}
