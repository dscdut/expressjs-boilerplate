import { DEFAULT_KEYWORD, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORT } from '../constant/pagination.constant';

export const PaginationDto = (body) => ({
  page_size: body?.page_size || DEFAULT_PAGE_SIZE,
  page: body?.page || DEFAULT_PAGE,
  sort: body?.sort || DEFAULT_SORT,
  search: body?.search || DEFAULT_KEYWORD,
});

export const PaginationResponseDto = (result) => ({
  total: result.count,
  data: result.rows,
});
