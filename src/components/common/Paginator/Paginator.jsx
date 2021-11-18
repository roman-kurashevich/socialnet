import React from "react";
import styles from './Paginator.module.css';

let Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let onPageChanged = (p) => {
    props.onPageChanged(p)
  }

  return (  
    <div>
      {pages.slice(0, 10).map(p => <span 
      className={`${styles.pagesNumbers} ${props.currentPage === p && styles.selectedPage}`}
      key={p}
      onClick={() => onPageChanged(p)}>
        {p}
      </span>)}
    </div>  
  )
}


export default Paginator;