import { Page } from '../interface/Pagination';

export function getCurrentSlice(arrayLength: number, pageLimit: number, currentPage: number): Page {
  const stopIndex = currentPage * pageLimit;
  const startIndex = stopIndex - pageLimit;
  return {
    startIndex,
    stopIndex: stopIndex > arrayLength ? arrayLength : stopIndex,
  };
}
