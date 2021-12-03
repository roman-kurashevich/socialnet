import React from "react";
import styles from "./Popup.module.css"

const Popup = (props) => {
  const closePopup = () => {
    props.closePopup(null);
  }

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <div>
          {props.message}
        </div>
        <button onClick={closePopup}>ok</button>
      </div>
    </div>
  )
}

export default Popup;