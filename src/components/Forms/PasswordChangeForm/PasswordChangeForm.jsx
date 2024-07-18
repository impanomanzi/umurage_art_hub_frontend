import { useState } from "react";
import "./PasswordChangeForm.css";
import settings from "../../settings.json";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import CustomLoadingButton from "../../FormButton/FormButton";
function PasswordChangeForm() {
  const [firstPassword, setFirstpassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [errorHappened, setErrorHappened] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkEquality = () => {
    let first = firstPassword;
    let second = secondPassword;
    if (first !== second) {
      throw new Error("Passwords mismatch");
    }
    return true;
  };
  const handleSubmitNewPassword = async (event) => {
    event.preventDefault();
    try {
      checkEquality();
      setIsLoading(true);
      let formData = new FormData();
      let userId;
      try {
        userId = jwtDecode(localStorage.getItem("token")).id;
      } catch (error) {
        throw new Error("your session expired");
      }
      formData.append("newPassword", secondPassword);
      const response = await fetch(
        `${settings.server_domain}/change_password`,
        {
          method: "POST",
          headers: {
            encType: "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: userId,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("password changed successfully");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setErrorHappened(true);
      setError(String(error));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="change-password-form-container">
      <form onSubmit={handleSubmitNewPassword}>
        <div className="form-group">
          <label htmlFor="First-new-password">Enter new password</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setFirstpassword(event.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="second-new-password">Retype new password</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setSecondPassword(event.target.value);
            }}
            required
          />
        </div>
        {errorHappened && (
          <div className="error-container">
            <div className="alert alert-danger">
              <center>{error}</center>
            </div>
          </div>
        )}
        <div className="form-group">
          <CustomLoadingButton
            isLoading={isLoading}
            onClick={null}
            text="change password"
            buttonType="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default PasswordChangeForm;
