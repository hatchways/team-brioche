import { Page } from '../interface/Pagination';

export function getCurrentSliceIndex(arrayLength: number, pageLimit: number, currentPage: number): Page {
  const stopIndex = currentPage * pageLimit;
  const startIndex = stopIndex - pageLimit;
  return {
    pageStart: startIndex,
    pageEnd: stopIndex > arrayLength ? arrayLength : stopIndex,
  };
}
