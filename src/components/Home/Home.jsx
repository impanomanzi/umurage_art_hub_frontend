import "./Home.css";
import { lazy, Suspense, useRef, useEffect } from "react";
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

  const exhibitionRef = useRef(null);
  const galleryRef = useRef(null);
  const motoRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Only scroll into view if the user has interacted (scrolled to this section)
          if (entry.target.dataset.hasBeenVisible) {
            entry.target.scrollIntoView({ behavior: "smooth" });
          } else {
            entry.target.dataset.hasBeenVisible = true;
          }
        }
      });
    }, options);

    if (exhibitionRef.current) observer.observe(exhibitionRef.current);
    if (galleryRef.current) observer.observe(galleryRef.current);
    if (motoRef.current) observer.observe(motoRef.current);

    return () => {
      if (exhibitionRef.current) observer.unobserve(exhibitionRef.current);
      if (galleryRef.current) observer.unobserve(galleryRef.current);
      if (motoRef.current) observer.unobserve(motoRef.current);
    };
  }, []);

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
        <div
          className="exhibition-section"
          ref={exhibitionRef}
          data-has-been-visible="false"
        >
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
        <div
          className="gallery-section"
          id="galleries"
          ref={galleryRef}
          data-has-been-visible="false"
        >
          <header>
            <h2 className="index-header">Galleries</h2>
          </header>
          <ErrorBoundary fallback={<ErrorComponent />}>
            <Suspense fallback={<Loading />}>
              <Gallery />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div
          className="moto-section"
          id="about"
          ref={motoRef}
          data-has-been-visible="false"
        >
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
