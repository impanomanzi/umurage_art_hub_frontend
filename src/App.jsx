import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import CheckPaymentForm from "./components/Forms/CheckPaymentForm/CheckPaymentForm.jsx";
import ExhibitionPaintingShow from "./components/ExhibitionPaintingShow/ExhibitionPaintingShow.jsx";
import ExhibitionPaintings from "./components/ExhibitionPaintings/ExhibitionPaintings.jsx";
import ExhibitionShowPage from "./components/ExhibitionShowPage/ExhibitionShowPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import GalleryShow from "./components/GalleryShow/GalleryShow.jsx";
import Home from "./components/Home/Home.jsx";
import LoginForm from "./components/Forms/LogInForm/LoginForm.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import PayementRegistrationForm from "./components/Forms/PaymentRegistrationForm/PayementRegistrationForm.jsx";
import Profile from "./components/Profile/Profile.jsx";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage.jsx";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { useGetExhibitions } from "./hooks/useGetExhibitions.jsx";
import { useGetPaintings } from "./hooks/useGetPaintings.jsx";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const [adminLoggedin, setAdminLogged] = useState(false);
  const [exhibitionLoading, exhibitions] = useGetExhibitions();
  const [paintingLoading, paintings] = useGetPaintings();

  return exhibitionLoading || paintingLoading ? (
    <div style={{ marginTop: "30%" }}>
      <center>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <p class="lead"> Loading ...</p>
      </center>
    </div>
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            Component={() => (
              <Home exhibitions={exhibitions} paintings={paintings} />
            )}
          />
          <Route
            path="/exhibition/:id"
            Component={() => {
              return <ExhibitionShowPage exhibitions={exhibitions} />;
            }}
          />
          <Route path="/view_painting/:id" Component={ExhibitionPaintingShow} />
          <Route
            path="/sign-in"
            Component={() => {
              return (
                <LoginForm
                  onClientLoggedIn={setLogin}
                  onAdminLoggedIn={setAdminLogged}
                />
              );
            }}
          />

          <Route path="/:image" />
          <Route
            path="/profile"
            element={
              adminLoggedin ? (
                <Profile
                  onLogout={setAdminLogged}
                  exhibitions={exhibitions}
                  paintings={paintings}
                />
              ) : (
                <Navigate to={"/sign-in"} replace={true} />
              )
            }
          />
          <Route path="/check_payment/:id" Component={CheckPaymentForm} />

          <Route
            path="/payment/:id"
            Component={() => {
              return <PayementRegistrationForm exhibitions={exhibitions} />;
            }}
          />
          <Route
            path="/gallery/:name"
            Component={() => {
              return <GalleryShow paintings={paintings} />;
            }}
          />
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
                <UserProfilePage
                  login={login}
                  exhibitions={exhibitions}
                  paintings={paintings}
                />
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
