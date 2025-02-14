import React, { createContext, useContext, useState } from "react";
import styles from "./AlertBox.module.css";
import { colors } from "../../utils/colors";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const showAlert = (message, isError) => {
    setIsError(isError);
    setMsg(message);
    setIsHidden(false);
    setTimeout(() => setIsHidden(true), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div
        className={styles.main}
        style={{
          opacity: isHidden ? "0" : "1",
          transition: "all .3s",
          visibility: isHidden ? "hidden" : "visible",
          backgroundColor: isError ? colors.error : colors.secondary,
        }}
      >
        <div className={styles.box}>
          <p className={styles.alertText}>{msg}</p>
        </div>
      </div>
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert system
export const useAlert = () => {
  return useContext(AlertContext);
};
