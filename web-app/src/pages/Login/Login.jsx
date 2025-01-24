import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
import LoadingElement from "../../components/LoadingScreen/LoadingElement";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login, loading } = useAuthContext();

  const handleError = (msg) => {
    setErrorMsg(msg);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Please enter your email");
      return;
    }
    if (password === "") {
      setErrorMsg("Please enter a password");
      return;
    }
    // if (password.length < 8) {
    //   setPasswordError("The password must be 8 characters or longer");
    //   return;
    // }
    login(email, password, handleError);
  };

  return (
    <form onSubmit={onSubmit} className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <img src="/Logo.svg" alt="logo" className={styles.logoClass} />
      </div>
      <br />
      {/* Error message container */}
      {errorMsg && (
        <div className={styles.errorContainer}>
          <p className={styles.errorLabel}>{errorMsg}</p>
        </div>
      )}
      <div className={styles.inputParentContainer}>
        <img
          src="/User.svg"
          alt="user icon"
          className={styles.inputIconClass}
        />
        <span className={styles.inputGap}></span>
        <div className={styles.inputContainer}>
          <input
            value={email}
            placeholder="Email"
            type="email"
            onChange={(ev) => setEmail(ev.target.value)}
            className={styles.inputBox}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                document.getElementById("submitBtn").click();
              }
            }}
          />
        </div>
      </div>
      {/* Email error message */}
      {emailError && (
        <div className={styles.emailError}>
          <label className={styles.errorLabel}>{emailError}</label>
        </div>
      )}
      <br />
      <div className={styles.inputParentContainer}>
        <img src="/Key.svg" alt="key icon" className={styles.inputIconClass} />
        <span className={styles.inputGap}></span>
        <div className={styles.inputContainer}>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            className={styles.inputBox}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                document.getElementById("submitBtn").click();
              }
            }}
          />
        </div>
      </div>
      <br />
      {/* uncomment kapag okay na yung forgot password */}
      {/* <div className={styles.forgotPasswordClass}>Forgot Password?</div> */}
      <br />
      <div className={styles.inputContainer}>
        <button
          className={styles.loginBtn + ` ${loading ? "bg-gray-400" : ""}`}
          type="submit"
          disabled={loading}
          id="submitBtn"
        >
          {loading ? <LoadingElement size={30} /> : "Log in"}
        </button>
      </div>
    </form>
  );
};

export default Login;
