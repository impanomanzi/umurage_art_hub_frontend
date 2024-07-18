import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { API } from "../../../API/serverRequest";
import FormNavbar from "../../NavBar/FormNavbar";
import "./LoginForm.css";
import CustomLoadingButton from "../../FormButton/FormButton";
function LoginForm(props) {
  const navigate = useNavigate();
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
      const options = {
        method: "POST",
        body: formData,
      };
      const data = await API.login(options);

      if (data.success) {
        let user_info;
        try {
          user_info = jwtDecode(data.token);
        } catch (error) {
          throw new Error("your session expired");
        }
        localStorage.setItem("userLive", true);
        localStorage.removeItem("token");
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("token", data.token);
        if (user_info.role === "admin") {
          navigate(`/profile`);
        } else {
          navigate("/user-profile");
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
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
            {/* <div className="horizontal-line">
              <span className="left-line">&nbsp;</span>
              <span className="text">or</span>
              <span className="right-line">&nbsp;</span>
            </div>
            <div className="social-login">
              <a href={`https://localhost:55555/login`}>
                <img src="/web_light_sq_SI.svg" />
              </a>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
