import { useLocation } from "react-router-dom";
import { useState } from "react";
import FormNavbar from "../NavBar/FormNavbar";
import { useEffect } from "react";
import { API } from "../../API/serverRequest";
import { Link } from "react-router-dom";
import useToast from "../../hooks/useToast";
function EmailVerification() {
  const token = new URLSearchParams(useLocation().search);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setToast } = useToast();
  const handleVerifyEmail = async () => {
    try {
      const formData = new FormData();
      formData.append("token", token.get("token"));
      const resp = await API.verifyEmail(formData);
      if (resp.success) {
        setSuccess(true);
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleVerifyEmail();
  }, []);
  return (
    <>
      <FormNavbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            Verifying ...
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            Email Verified
            <Link to="/sign-in" className="btn btn-success">
              continue to login
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default EmailVerification;
