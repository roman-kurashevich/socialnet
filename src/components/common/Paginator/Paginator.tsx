import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Paginator.module.css";

type PropsType = {
  totalItemsCount: number
  pageSize: number
  portionSize: number
  currentPage: number
  portionOfPagesNumber: number

  onPageChanged: (p: any) => void
  setPortionOfPagesNumber: (portionNumber: number) => void
};

let Paginator: React.FC<PropsType> = (props) => {
  let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / props.portionSize);

  let [portionNumber, setPortionNumber] = useState(props.portionOfPagesNumber);

  useEffect(() => {
    setPortionNumber(props.portionOfPagesNumber)
  }, [props.portionOfPagesNumber, props.currentPage])

  let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
  let rightPortionPageNumber = portionNumber * props.portionSize;

  let onPageChanged = (p: any): void => {
    props.onPageChanged(p);
    props.setPortionOfPagesNumber(portionNumber);
  };

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          PREV
        </button>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => (
          <span
            className={`${styles.pagesNumbers} ${
              props.currentPage === p && styles.selectedPage
            }`}
            key = {p}
            onClick={() => onPageChanged(p)}
          >
            {p}
          </span>
        ))}
      {portionCount > portionNumber && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
