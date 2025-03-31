import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation, useParams } from "react-router-dom";
import settings from "../settings.json";
import "./ExhibitionShowPage.css";
import { useEffect, useState } from "react";
import useExhibitions from "../../hooks/useExhibitions";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet-async";
import CurrencyView from "../CurrencyView/CurrencyView";

function ExhibitionShowPage() {
  const { exhibitions } = useExhibitions();
  const[wanted, setwanted]= useState({})
  const exhibitionId = useParams().id;
  const location= useLocation();
  
  
  useEffect(() => {
    const ex = exhibitions.find((item) => item.id === exhibitionId);
    if (ex) {
      setwanted(ex);
    }
  }, [exhibitions, exhibitionId]);

  return (
    <>
      <Helmet>
        <title>{wanted?.name}</title>
        <meta
          name="description"
          content={`Explore the ${wanted?.name}, a virtual exhibition showcasing. Join us online to experience a unique digital art event featuring works from various artists.`}
        />
        <meta
          name="keywords"
          content={`${wanted?.name}, Virtual Exhibition, Online Art Event, Digital Art Showcase,Art Exhibition`}
        />
      </Helmet>
     
      <div className="exhibition-main-section">
      <nav>
          <div className="nav-logo">
          <Link to="/"><img src="/UMURAGE HEADER.png" alt="" /></Link>
          </div>
         <div className="nav-links"> 
          <Link
                to={`/payment/${exhibitionId}`}
                className="btn-register"
                state={{ exhibition: wanted }}
              >
                Register
              </Link>
              
              <Link
                to={`/check_payment/${exhibitionId}`}
                className="btn-signin"
                
              >
                Sign in
              </Link>
              </div>
        </nav>
        <div className="exhibition-container">
        <div className="exhibition-inner-container">
         
            <h3 className="exhibitionpage-title">
              {wanted?.name?.toUpperCase()} | {wanted?.host?.toUpperCase()}
            </h3>
            <div className="exhibitionpage-meta">

            <p>
              <i className="fas">&nbsp; Start:</i> &nbsp;{" "}
              {wanted.startdate}
            </p>

            <p>
              <i className="fas">&nbsp; End:</i>
              &nbsp; {wanted.enddate}
            </p>
         
           <p>  
            <CurrencyView
              number={wanted.fees}
              style={{ fontSize: "1.3em" }}
            />
            </p>
         
        </div>
            <LazyLoadImage
              src={`${wanted?.image?.replace(
                "http://localhost:5000",
                `${settings.server_domain}`
              )}`}
              effect="blur"
              placeholderSrc="/placeholder.png"
              id="exhibition-image"
            />

         
            <ReactMarkdown className="w-20 exhibition-desc-content">{wanted.description}</ReactMarkdown> <br />
            <span className="host-credit">{wanted.host}</span>
          

         
        </div>
        </div>
      </div>
    </>
  );
}

export default ExhibitionShowPage;
