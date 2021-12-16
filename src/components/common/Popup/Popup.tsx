import React from "react";
import styles from "./Popup.module.css";

type PropsType = {
  message: null | string
  closePopup: () => void
}

const Popup: React.FC<PropsType> = (props) => {
  const closePopup = () => {
    props.closePopup();
  };

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <div>{props.message}</div>
        <button onClick={closePopup}>ok</button>
      </div>
    </div>
  );
};

export default Popup;
