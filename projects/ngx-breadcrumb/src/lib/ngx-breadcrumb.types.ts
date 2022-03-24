export interface IBreadcrumb {
  key: string;
  label: string;
  url: string;
  isClickable?: boolean;
  tooltip?: string;
}

export interface IReplaceBreadcrumb {
  key: string;
  newLabel: string;
  newUrl?: string | string[];
  tooltip?: string;
}
