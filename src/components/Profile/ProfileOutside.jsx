import { useLocation } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
function ProfileOutside(props) {
  const token = new URLSearchParams(useLocation().search).get("t");
  const navigate = useNavigate();

  try {
    let user_info;
    try {
      user_info = jwtDecode(token);
    } catch (error) {
      toast.error("Your sesssion expired");
    }
    localStorage.setItem("token", token);
    if (user_info.role === "admin") {
      props.onAdminLoggedIn(true);
      navigate(`/profile`);
    } else {
      props.onClientLoggedIn(true);
      navigate("/user-profile");
    }
  } catch (error) {
    toast.error(toString(error));
    navigate("/");
  }
}

export default ProfileOutside;
