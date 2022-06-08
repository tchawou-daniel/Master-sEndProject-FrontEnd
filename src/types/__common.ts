export interface PaginationListResponse<T> {
  totalItems: number;
  items: T[];
  pageCount: number | null;
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface OptionType {
  label: string;
  value: string;
}
