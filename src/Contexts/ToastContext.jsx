import { createContext, useState } from "react";

const ToastContext = createContext();
export function ToastProvider({ children }) {
  const [toast, setToast] = useState({});
  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
}
export default ToastContext;
