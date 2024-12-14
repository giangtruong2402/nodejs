import { useMemo } from "react";
import { generateRange } from "ultils/helpers";
import icons from "ultils/icons";

const { BsThreeDots } = icons;

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = +process.env.REACT_APP_LIMIT || 12;
    const paginationCount = Math.ceil(+totalProductCount / pageSize);
    const totalPaginationItem = siblingCount + 5;
    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < paginationCount - 1;
    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);
    if (paginationCount <= totalPaginationItem)
      return generateRange(1, paginationCount);
    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, <BsThreeDots />, ...rightRange];
    }
    if (isShowRight && !isShowLeft) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, <BsThreeDots />, paginationCount];
    }
    if (isShowLeft && isShowRight) {
      const middelRange = generateRange(siblingLeft, siblingRight);
      return [
        1,
        <BsThreeDots />,
        ...middelRange,
        <BsThreeDots />,
        paginationCount,
      ];
    }
  }, [totalProductCount, currentPage, siblingCount]);

  return paginationArray;
};

export default usePagination;
