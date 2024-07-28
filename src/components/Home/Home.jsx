import "./Home.css";
import { useEffect, useRef, lazy, Suspense } from "react";
import { useInView, useAnimation } from "framer-motion";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary.jsx";
import Loading from "../loading/loading.jsx";
import ErrorComponent from "../ErrorComponent/ErrorComponent.jsx";

function Home() {
  const HomeNavBar = lazy(() => import("../NavBar/HomeNavBar.jsx"));
  const Announcement = lazy(() => import("../Announcement/Announcement.jsx"));
  const Gallery = lazy(() => import("../Gallery/Gallery.jsx"));
  const Exhibitions = lazy(() => import("../Exhibitions/Exhibitions.jsx"));
  const Moto = lazy(() => import("../Moto/Moto.jsx"));

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
          <header>
            <h2>Exhibitions</h2>
          </header>
          <div className="home-exhibition-container">
            <ErrorBoundary fallback={<ErrorComponent />}>
              <Suspense fallback={<Loading />}>
                <Exhibitions />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
        <div className="gallery-section">
          <header>
            <h2>Galleries</h2>
          </header>
          <ErrorBoundary fallback={<ErrorComponent />}>
            <Suspense fallback={<Loading />}>
              <Gallery />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="moto-section">
          <header>
            <h2>About</h2>
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
