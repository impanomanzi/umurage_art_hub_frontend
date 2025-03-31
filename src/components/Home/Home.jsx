import "./Home.css";
import { lazy, Suspense, useRef} from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary.jsx";
import Loading from "../loading/loading.jsx";
import ErrorComponent from "../ErrorComponent/ErrorComponent.jsx";
import Features from "../Features/Features.jsx";
import useExhibitions from "../../hooks/useExhibitions.jsx";
import { Helmet } from "react-helmet-async";

function Home() {
  const NavBar = lazy(() => import("../FantasticHomeNavbar/FantasticHomeNavbar.jsx"));
  const Announcement = lazy(() => import("../Announcement/Announcement.jsx"));
  const Gallery = lazy(() => import("../Gallery/Gallery.jsx"));
  const Exhibitions = lazy(() => import("../Exhibitions/Exhibitions.jsx"));
  const Painters= lazy(()=>import( "../Painters/Painters.jsx"))
  const AboutUs= lazy(()=>import("../AboutUs/AboutUs.jsx"))
  const Contacts= lazy(()=>import( "../Contacts/Contacts.jsx"))
  const { exhibitions } = useExhibitions();
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const paintersRef= useRef(null);
  const aboutRef = useRef(null);
 
  return (
    <>
      <Helmet>
        <title>Umurage Art Hub - Virtual Art Gallery</title>
        <meta
          name="description"
          content="Explore Umurage Art Hub's virtual art exhibitions and digital showcases."
        />
        <meta
          name="keywords"
          content="Virtual Art Gallery, Online Art Exhibitions, Digital Art Gallery, Virtual Exhibition Space, Rwandan Art, Umurage Art Hub"
        />
      </Helmet>

       {/* header */}
      <header id="header">
        {/* navbar section */}
       <div id="navbar" className="home-navbar-container">
        <ErrorBoundary fallback={<ErrorComponent />}>
          <Suspense fallback={<Loading />}>
            <NavBar/>
          </Suspense>
        </ErrorBoundary>
        </div>

        <div  id={"announcement"}>
          <ErrorBoundary fallback={<ErrorComponent />}>
            <Suspense fallback={<Loading />}>
              <Announcement />
            </Suspense>
          </ErrorBoundary>
        </div>
      </header>

      {/* end header */}

      {/* hero section */}
        <section id="hero" ref={heroRef}>
          <div
            className="hero-container"
            data-has-been-visible="false"
          >
            {exhibitions?.length ? (
                
                  <section className="exhibitions">
                  
                    <ErrorBoundary fallback={<ErrorComponent />}>
                    <Suspense fallback={<Loading />}>
                      <Exhibitions />
                    </Suspense>
                  </ErrorBoundary>
                  </section>
                
            
            ) : (
            
                
                  <ErrorBoundary fallback={<ErrorComponent />}>
                    <Suspense fallback={<Loading />}>
                      <Features />
                    </Suspense>
                  </ErrorBoundary>
                
              
            )}
          </div>
          </section>
          {/* end hero section */}

          {/* main */}
          <main id="main">

            {/* gallery section */}
          <section
            id="gallery"
            ref={galleryRef}
            data-has-been-visible="false"
          >
             
              <h2 className="index-header">Galleries</h2>
           
            <ErrorBoundary fallback={<ErrorComponent />}>
              <Suspense fallback={<Loading />}>
                <Gallery />
              </Suspense>
            </ErrorBoundary>
          </section>
          {/* End gallery section */}


          {/* painters section */}
          <section
            id="painters"
            ref={paintersRef}
            data-has-been-visible="false"
          >
             
              <h2 className="index-header">Painters</h2>
          
            <ErrorBoundary fallback={<ErrorComponent />}>
              <Suspense fallback={<Loading />}>
                <Painters/>
              </Suspense>
            </ErrorBoundary>
          </section>
          {/* end painters section */}

          {/*about section  */}
          <section
            id="about"
            ref={aboutRef}
            data-has-been-visible="false"
          >
              <h2 className="index-header">About us</h2>
            
            <ErrorBoundary fallback={<ErrorComponent />}>
              <Suspense fallback={<Loading />}>
                <AboutUs/>
              </Suspense>
            </ErrorBoundary>
            
          </section>

          {/* end about section */}

          {/*Contact section  */}
          <section
            id="contact"
            ref={aboutRef}
            data-has-been-visible="false"
          >
              <h2 className="index-header">Contact</h2>
            
            <ErrorBoundary fallback={<ErrorComponent />}>
              <Suspense fallback={<Loading />}>
                <Contacts/>
              </Suspense>
            </ErrorBoundary>
            
          </section>

          {/* end contact section */}
          </main>
          {/* end main */}
 
        
      
    </>
  );
}

export default Home;
