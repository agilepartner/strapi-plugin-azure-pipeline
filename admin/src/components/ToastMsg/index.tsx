import { Alert } from '@strapi/design-system/Alert';
import React from 'react';

const stickyStyle: React.CSSProperties = {
  position: 'fixed',
  top: 24,
  left: 'calc(50%)',
  transform: 'translateX(-50%)',
  zIndex: 10,
};

export type ToastMessageProps = {
  variant: string;
  title: string;
  message: string;
  action?: React.ReactNode;
  closeToastHandler?: () => void;
};

export default function ToastMessage({
  variant,
  title,
  message,
  action,
  closeToastHandler,
}: ToastMessageProps) {
  return (
    <Alert
      variant={variant}
      title={title}
      action={action}
      style={stickyStyle}
      onClose={closeToastHandler}
      closeLabel="close alert"
    >
      {message}
    </Alert>
  );
}
