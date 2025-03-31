import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { API } from "../../../API/serverRequest";
import Alert from "react-bootstrap/Alert";
import "./LoginForm.css";
import CustomLoadingButton from "../../FormButton/FormButton";
import useAuth from "../../../hooks/useAuth";
import useToast from "../../../hooks/useToast";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
     <Helmet>
        <title>Umurage Art Hub - Sign in</title>
        <meta
          name="description"
          content="Sign to  Umurage Art Hub to start exploring more with us."
        />
        <meta
          name="keywords"
          content="Virtual Art Gallery, Online Art Exhibitions, Digital Art Gallery, Virtual Exhibition Space, Rwandan Art, Umurage Art Hub"
        />
      </Helmet>
     
      
      <div className="login-main-section">
      <nav>
          <div className="nav-logo">
          <Link to="/"><img src="/UMURAGE HEADER.png" alt="" /></Link>
          </div>
        </nav>
        <div className="login-form-container">
        <div className="login-form-inner-container">
          <div className="login-form-header">
            <h2>Sign In </h2>
          </div>
          <form onSubmit={handleOnSubmit}>
            {message && (
              <Alert variant="info">
                <p>{message}</p>
              </Alert>
            )}
            <div className="login-form-group">
              <label htmlFor="username" className="col-form-label">
                Username
              </label>
              <input
                type="text"
                className="login-form-control form-control"
                required
                name="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="col-form-label">
                Password
              </label>
              <input
                type="password"
                className="login-form-control form-control"
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
      </div>
    </>
  );
}

export default LoginForm;
