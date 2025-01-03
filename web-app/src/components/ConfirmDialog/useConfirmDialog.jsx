import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

export const useConfirmDialog = (title, message) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolveCallback, setResolveCallback] = useState(null);

  const confirm = (title, message) =>
    new Promise((resolve) => {
      setIsOpen(true);
      setResolveCallback(() => resolve);
    });

  const handleConfirm = () => {
    if (resolveCallback) resolveCallback(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (resolveCallback) resolveCallback(false);
    setIsOpen(false);
  };

  const ConfirmDialogComponent = (
    <ConfirmDialog
      isOpen={isOpen}
      title={title}
      message={message}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { confirm, ConfirmDialogComponent };
};
