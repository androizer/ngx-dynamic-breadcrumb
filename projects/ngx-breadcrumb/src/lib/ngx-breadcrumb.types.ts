export interface IBreadcrumb {
  key: string;
  label: string;
  url: string;
  isClickable?: boolean;
}

export interface IReplaceBreadcrumb {
  key: string;
  newLabel: string;
  newUrl?: string | string[];
}
