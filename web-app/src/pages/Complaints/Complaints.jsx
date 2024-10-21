import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import Pending from "./Pending";
import Solved from "./Solved";
import styles from "./complaints.module.css";
const Complaints = () => {
  const [isPending, setIsPending] = useState(true);
  const [isSolve, setIsSolve] = useState(false);

  const pending = () => {
    setIsPending(true);
    setIsSolve(false);
  };

  const solved = () => {
    setIsPending(false);
    setIsSolve(true);
  };

  return (
    <div className={styles.mainContainer}>
      <div>
        <MainLogo />
        <div className="text-right w-[90%] mx-auto space-x-2">
          <input
            className="text-center bg-green p-2 text-white rounded-md cursor-pointer hover:bg-secondary"
            value={"PENDING"}
            onClick={pending}
            type="button"
          />
          <input
            className="text-center bg-green p-2 text-white rounded-sm cursor-pointer hover:bg-secondary"
            value={"SOLVED"}
            onClick={solved}
            type="button"
          />
        </div>
      </div>
      <div className="flex-1 items-center justify-center mb-10 p-4">
        <div>{isPending ? <Pending /> : isSolve && <Solved />}</div>
      </div>
    </div>
  );
};

export default Complaints;
