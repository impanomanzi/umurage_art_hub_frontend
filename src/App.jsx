import { useState } from "react";

import "./App.css";

import Home from "./components/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage.jsx";
import LoginForm from "./components/LogInForm/LoginForm.jsx";
import PayementRegistrationForm from "./components/PaymentRegistrationForm/PayementRegistrationForm.jsx";
import GalleryShow from "./components/GalleryShow/GalleryShow.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/profile" Component={Profile} />
          <Route path="/sign-in" Component={LoginForm} />
          <Route path="/payment/:id" Component={PayementRegistrationForm} />
          <Route path="/gallery/:name" Component={GalleryShow} />
          <Route
            path="/gallery"
            Component={() => {
              return (
                <>
                  <h1>Gallery info</h1>
                </>
              );
            }}
          />
          <Route path="/user-profile" Component={UserProfilePage} />
          <Route path="*" Component={NotFound} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
