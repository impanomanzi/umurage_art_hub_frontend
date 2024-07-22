import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { API } from "../../../API/serverRequest";
import FormNavbar from "../../NavBar/FormNavbar";
import Alert from "react-bootstrap/Alert";
import "./LoginForm.css";
import CustomLoadingButton from "../../FormButton/FormButton";
import useAuth from "../../../hooks/useAuth";
import useToast from "../../../hooks/useToast";
function LoginForm(props) {
  const { setToast } = useToast();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const from = useLocation().state?.from;
  const message = useLocation().state?.message;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const resp = await API.login(formData);
      if (resp.success) {
        let user_info;
        try {
          user_info = jwtDecode(resp.token);
        } catch (error) {
          throw new Error("username or password is incorrect.");
        }
        setAuth(resp.token);
        localStorage.setItem("userLive", true);
        localStorage.removeItem("token");
        localStorage.setItem("token", resp.token);
        sessionStorage.setItem("token", resp.token);
        from
          ? navigate(from)
          : user_info.role === "admin"
          ? navigate(`/profile`)
          : navigate("/user-profile");
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormNavbar />
      <div className="form-outer-container">
        <div className="form-inner-container">
          <div className="login-form-header">
            <h2>SIGN IN </h2>
          </div>
          <form onSubmit={handleOnSubmit}>
            {message && (
              <Alert variant="info">
                <p>{message}</p>
              </Alert>
            )}
            <div className="form-group">
              <label htmlFor="username" className="col-form-label">
                USERNAME
              </label>
              <input
                type="text"
                className="form-control"
                required
                name="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="col-form-label">
                PASSWORD
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <CustomLoadingButton
              isLoading={isLoading}
              onClick={null}
              text="Sign in"
              buttonType="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
