export interface PagedList<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
}
