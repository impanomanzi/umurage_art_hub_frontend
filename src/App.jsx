import { useState } from "react";

import "./App.css";
import Home from "./components/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Profile from "./components/Profile/Profile.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage.jsx";
import LoginForm from "./components/LogInForm/LoginForm.jsx";
import PayementRegistrationForm from "./components/PaymentRegistrationForm/PayementRegistrationForm.jsx";
import GalleryShow from "./components/GalleryShow/GalleryShow.jsx";
import ExhibitionPaintings from "./components/ExhibitionPaintings/ExhibitionPaintings.jsx";
import ExhibitionShowPage from "./components/ExhibitionShowPage/ExhibitionShowPage.jsx";
import ExhibitionPaintingShow from "./components/ExhibitionPaintingShow/ExhibitionPaintingShow.jsx";
function App() {
  const [login, setLogin] = useState(false);
  const [adminLoggedin, setAdminLogged] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/exhibition/:id" Component={ExhibitionShowPage} />
          <Route path="/view_painting/:id" Component={ExhibitionPaintingShow} />
          <Route
            path="/sign-in"
            Component={() => {
              return <LoginForm onClientLoggedIn={() => setLogin(true)} />;
            }}
          />
          <Route path="/profile/:id" Component={Profile} />

          <Route path="/payment/:id" Component={PayementRegistrationForm} />
          <Route path="/gallery/:name" Component={GalleryShow} />
          <Route
            path="/exhibition_paintings/:id"
            Component={ExhibitionPaintings}
          />
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
          <Route
            path="/user-profile"
            element={
              login ? (
                <UserProfilePage login={login} />
              ) : (
                <Navigate to={"/sign-in"} replace={true} />
              )
            }
          />
          <Route path="*" Component={NotFound} />
          <Route path="/checkout/:payement-data" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
