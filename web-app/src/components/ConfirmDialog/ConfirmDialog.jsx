import React, { useState } from "react";
import ReactDOM from "react-dom";
import { colors } from "../../utils/colors";

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <div style={titleContainer}>
          <h2 className="text-white">{title}</h2>
        </div>
        <div style={bottomContainer}>
          <p>{message}</p>
          <div style={buttonContainerStyles}>
            <button
              className="underline decoration-secondary"
              style={buttonStyles}
              onClick={onConfirm}
            >
              Yes
            </button>
            <button style={buttonStyles} onClick={onCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Styling
const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const titleContainer = {
  backgroundColor: colors.primary,
  padding: "20px",
  borderTopRightRadius: "8px",
  borderTopLeftRadius: "8px",
};

const bottomContainer = {
  backgroundColor: colors.white,
  padding: "20px",
  borderBottomRightRadius: "8px",
  borderBottomLeftRadius: "8px",
};

const modalStyles = {
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const buttonContainerStyles = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-around",
};

const buttonStyles = {
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

export default ConfirmDialog;
