export const getPageNumbers = (
  pageNumbers: number[],
  page: string | undefined,
  totalPages: number,
  displayLimit: number,
  start: number,
  end: number,
  totalCard: number | undefined
) => {
  let newPageNumbers: (number | string)[] = [];

  if (totalPages > displayLimit) {
    if (Number(page) < Math.floor(displayLimit / 2) + 1) {
      newPageNumbers = pageNumbers.slice(0, displayLimit);
      newPageNumbers.push('...');
    } else if (Number(page) > totalCard! - Math.floor(displayLimit / 2)) {
      newPageNumbers = [1, '...'].concat(
        pageNumbers.slice(totalPages - displayLimit + 1)
      );
    } else {
      newPageNumbers = [1, '...'].concat(pageNumbers.slice(start, end));
      newPageNumbers.push('...');
      newPageNumbers.push(totalPages);
    }
  } else {
    newPageNumbers = pageNumbers.slice(0, totalPages);
  }

  return newPageNumbers;
};

export const createArray = (N: number) =>
  Array.from({ length: N }, (_, index) => index + 1);
