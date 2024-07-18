import "./App.css";
import "./components/ProfileTopNav/ProfileTopNav.css";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { useGetExhibitions } from "./hooks/useGetExhibitions.jsx";
import { useGetPaintings } from "./hooks/useGetPaintings.jsx";
import { lazy } from "react";
import { Suspense } from "react";
import Loading from "./components/loading/loading.jsx";
import { Toaster } from "react-hot-toast";
import AuthContext from "./components/Contexts/AuthContext.jsx";
import { PaintingAndExhibitionsContext } from "./components/Contexts/PaintingAndExhibitionsContext.jsx";
function App() {
  const EmailVerification = lazy(() =>
    import("./components/EmailVerification/EmailVerification.jsx")
  );
  const GalleryShow = lazy(() =>
    import("./components/GalleryShow/GalleryShow.jsx")
  );
  const ProfileOutside = lazy(() =>
    import("./components/Profile/ProfileOutside.jsx")
  );
  const LoginForm = lazy(() =>
    import("./components/Forms/LogInForm/LoginForm.jsx")
  );
  const CheckPaymentForm = lazy(() =>
    import("./components/Forms/CheckPaymentForm/CheckPaymentForm.jsx")
  );
  const ExhibitionPaintingShow = lazy(() =>
    import("./components/ExhibitionPaintingShow/ExhibitionPaintingShow.jsx")
  );
  const ExhibitionPaintings = lazy(() =>
    import("./components/ExhibitionPaintings/ExhibitionPaintings.jsx")
  );
  const ExhibitionShowPage = lazy(() =>
    import("./components/ExhibitionShowPage/ExhibitionShowPage.jsx")
  );
  const PayementRegistrationForm = lazy(() =>
    import(
      "./components/Forms/PaymentRegistrationForm/PayementRegistrationForm.jsx"
    )
  );
  const Profile = lazy(() => import("./components/Profile/Profile.jsx"));
  const UserProfilePage = lazy(() =>
    import("./components/UserProfilePage/UserProfilePage.jsx")
  );

  const [exhibitionLoading, exhibitions] = useGetExhibitions();
  const [paintingLoading, paintings] = useGetPaintings();
  console.log(paintingLoading, exhibitionLoading);
  return exhibitionLoading || paintingLoading ? (
    <Loading />
  ) : (
    <AuthContext.Provider value={sessionStorage.getItem("token")}>
      <PaintingAndExhibitionsContext.Provider
        value={{ exhibitions: exhibitions, paintings: paintings }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={() => <Home />} />
            <Route
              path="/exhibition/:id"
              Component={() => {
                return (
                  <Suspense fallback={<Loading />}>
                    <ExhibitionShowPage />
                  </Suspense>
                );
              }}
            />
            <Route
              path="/view_painting/:id"
              Component={() => {
                return <ExhibitionPaintingShow />;
              }}
            />
            <Route
              path="/sign-in"
              Component={() => {
                return (
                  <Suspense fallback={<Loading />}>
                    <LoginForm />
                  </Suspense>
                );
              }}
            />

            <Route path="/:image" />

            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/oprofile"
              element={
                <Suspense fallback={<Loading />}>
                  <ProfileOutside />
                </Suspense>
              }
            />
            <Route
              path="/check_payment/:id"
              Component={() => {
                return (
                  <Suspense fallback={<Loading />}>
                    <CheckPaymentForm />
                  </Suspense>
                );
              }}
            />

            <Route
              path="/payment/:id"
              Component={() => {
                return (
                  <Suspense fallback={<Loading />}>
                    <PayementRegistrationForm exhibitions={exhibitions} />
                  </Suspense>
                );
              }}
            />
            <Route
              path="/gallery/:name"
              Component={() => {
                return (
                  <Suspense fallback={<Loading />}>
                    <GalleryShow />;
                  </Suspense>
                );
              }}
            />
            <Route
              path="/verify-email"
              Component={() => {
                return (
                  <Suspense fallback={<Loading />}>
                    <EmailVerification />
                  </Suspense>
                );
              }}
            />
            <Route
              path="/exhibition_paintings/:id"
              Component={() => {
                return (
                  <Suspense fallback={<Loading />}>
                    <ExhibitionPaintings />
                  </Suspense>
                );
              }}
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
                <Suspense fallback={<Loading />}>
                  <UserProfilePage />
                </Suspense>
              }
            />
            <Route path="*" Component={NotFound} />
            <Route path="/checkout/:payement-data" />
          </Routes>
          <Footer />
          <Toaster />
        </BrowserRouter>
      </PaintingAndExhibitionsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
