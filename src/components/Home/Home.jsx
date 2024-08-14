import "./Home.css";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary.jsx";
import Loading from "../loading/loading.jsx";
import ErrorComponent from "../ErrorComponent/ErrorComponent.jsx";
import Features from "../Features/Features.jsx";
import useExhibitions from "../../hooks/useExhibitions.jsx";

function Home() {
  const HomeNavBar = lazy(() => import("../NavBar/HomeNavBar.jsx"));
  const Announcement = lazy(() => import("../Announcement/Announcement.jsx"));
  const Gallery = lazy(() => import("../Gallery/Gallery.jsx"));
  const Exhibitions = lazy(() => import("../Exhibitions/Exhibitions.jsx"));
  const Moto = lazy(() => import("../Moto/Moto.jsx"));
  const { exhibitions } = useExhibitions();

  return (
    <div className="home">
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Suspense fallback={<Loading />}>
          <HomeNavBar />
        </Suspense>
      </ErrorBoundary>
      <div>
        <ErrorBoundary fallback={<ErrorComponent />}>
          <Suspense fallback={<Loading />}>
            <Announcement />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="home-main-container">
        <div className="exhibition-section">
          {exhibitions?.length ? (
            <>
              <header>
                <h2 className="index-header">Exhibitions</h2>
              </header>
              <div className="home-exhibition-container">
                <ErrorBoundary fallback={<ErrorComponent />}>
                  <Suspense fallback={<Loading />}>
                    <Exhibitions />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </>
          ) : (
            <>
              <div className="home-exhibition-container">
                <ErrorBoundary fallback={<ErrorComponent />}>
                  <Suspense fallback={<Loading />}>
                    <Features />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </>
          )}
        </div>
        <div className="gallery-section" id="galleries">
          <header>
            <h2 className="index-header">Galleries</h2>
          </header>
          <ErrorBoundary fallback={<ErrorComponent />}>
            <Suspense fallback={<Loading />}>
              <Gallery />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="moto-section" id="about">
          <header>
            <h2 className="index-header">About us</h2>
          </header>
          <ErrorBoundary fallback={<ErrorComponent />}>
            <Suspense fallback={<Loading />}>
              <Moto />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default Home;
