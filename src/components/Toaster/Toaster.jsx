import useToast from "../../hooks/useToast";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState, useEffect } from "react";

function Toaster() {
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, [toast]);

  return (
    toast?.message && (
      <ToastContainer
        position="top-end"
        className="p-3 position-fixed"
        style={{ zIndex: 200000 }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
            <small>Now</small>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    )
  );
}

export default Toaster;
