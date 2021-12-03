import React from "react";
import styles from './Button.module.css';

const Button = (props) => {
  return (
    <div type={'button'} className={styles.button}>
      {props.text}
    </div>
  )
}

export default Button;