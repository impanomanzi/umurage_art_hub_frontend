import { useLocation } from "react-router-dom";
import settings from "../../components/settings.json";
import { useState } from "react";
import FormNavbar from "../NavBar/FormNavbar";
import { useEffect } from "react";
function EmailVerification() {
  const token = new URLSearchParams(useLocation().search);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleVerifyEmail = async () => {
    const formData = new FormData();
    formData.append("token", token.get("token"));
    try {
      setLoading(true);
      const resp = await fetch(`${settings.server_domain}/verify`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await resp.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      setSuccess(false);
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
            VERIFYING YOUR EMAIL...
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {success && !loading ? (
          <div className="alert alert-success">
            Email Verified
            <a href="/sign-in" className="btn btn-success">
              continue to login
            </a>
          </div>
        ) : null}
        {!success && !loading ? (
          <div className="alert alert-danger">
            Your email not verified due to invalid token or expired
          </div>
        ) : null}
      </div>
    </>
  );
}

export default EmailVerification;
