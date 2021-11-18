import React from "react";
import { useState } from "react";
import styles from './Paginator.module.css';

let Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / props.pageSize);
  let [portionNumber, setPortionNumber] = useState(props.portionOfPagesNumber);
  let leftPortionPageNumber = (portionNumber - 1) * props.pageSize + 1;
  let rightPortionPageNumber = portionNumber * props.pageSize;

  let onPageChanged = (p) => {
    props.onPageChanged(p)
    props.setPortionOfPagesNumber(portionNumber)
  }

  return (  
    <div className={styles.paginator}>
      { portionNumber > 1 &&
       <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
      
      {pages.filter(p => p >= leftPortionPageNumber && p<= rightPortionPageNumber).map(p => <span 
      className={`${styles.pagesNumbers} ${props.currentPage === p && styles.selectedPage}`}
      key={p}
      onClick={() => onPageChanged(p)}>
        {p}
      </span>)}
      { portionCount > portionNumber &&
       <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}

    </div>  
  )
}


export default Paginator;