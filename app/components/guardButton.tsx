"use client";

import { ReactNode, useState } from "react";
import Toast from "./toast";
import { debounce } from "chart.js/helpers";

const GuardButton = ({
  condition,
  children,
  customFunction,
  customParameter,
  className,
}: {
  condition: boolean;
  children: ReactNode;
  customFunction: (value: string) => void;
  customParameter: string;
  className: string;
}) => {
  const [showError, setShowError] = useState(false);
  const debouncedSetShowError = debounce(() => setShowError(false), 2500);

  const handleError = () => {
    setShowError(true);

    debouncedSetShowError();
  };

  return (
    <>
      {condition ? (
        <button
          onClick={() => customFunction(customParameter)}
          className={className}
        >
          {children}
        </button>
      ) : (
        <button onClick={handleError} className={className}>
          {children}
        </button>
      )}

      {showError && (
        <Toast
          toastMessage="You don't have access to this resource. Please sign in or register."
          toastType="warning"
        />
      )}
    </>
  );
};

export default GuardButton;
