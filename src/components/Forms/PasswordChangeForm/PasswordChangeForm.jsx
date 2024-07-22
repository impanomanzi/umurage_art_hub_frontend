import { useState } from "react";
import "./PasswordChangeForm.css";
import CustomLoadingButton from "../../FormButton/FormButton";
import useToast from "../../../hooks/useToast";
import useUser from "../../../hooks/useUser";
import { API } from "../../../API/serverRequest";
function PasswordChangeForm() {
  const { setToast } = useToast();
  const [firstPassword, setFirstpassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  const checkEquality = () => {
    let first = firstPassword;
    let second = secondPassword;
    if (first !== second) {
      setToast({ variant: "danger", message: "Passwords mismatch" });
      return false;
    }
    return true;
  };
  const handleSubmitNewPassword = async (event) => {
    event.preventDefault();
    try {
      if (checkEquality()) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("newPassword", secondPassword);
        const resp = await API.changePassword(formData, user.id);
        if (resp.success) {
          setToast({ variant: "success", message: "password changed" });
        } else {
          setToast({ variant: "danger", message: resp.message });
        }
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
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
