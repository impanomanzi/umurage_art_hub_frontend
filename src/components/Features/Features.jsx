import "./Features.css";
import usePaintings from "../../hooks/usePaintings";
import { useMemo } from "react";
import { removeDuplication } from "../../lib/removeDuplication";
import CountUp from 'react-countup';
import { Link } from "react-router-dom";

const HomePageSection = () => {
  const { paintings } = usePaintings();
  const galleryOwners = useMemo(() => {
    const galleryOwners =    paintings?.data?.map((gallery) => gallery.owner);
    return removeDuplication(galleryOwners);
  }, [paintings]);


  const scrollToSection= (sectionId)=>{
    const element= document.getElementById(sectionId);
    if(element){
      const marginTop=90;
      const scrollToY= element.getBoundingClientRect().top+window.scrollY-marginTop;
      window.scrollTo({top:scrollToY, behavior:"smooth"});
    }
     
  }
  return (
    <div className="home-page-section">
      <div className="content">
      <h1 id="hero-header">WELCOME TO UMURAGE ART HUB</h1>
        <p className="description">
       
Explore a collection of <span className="number"> <CountUp end=  {paintings.data.length} /></span> stunning paintings created by <span className="number">   <CountUp end={galleryOwners.length} />  </span>skilled artists <span id="more-content">, trusted and admired by a community of <span className="number"> {} </span> satisfied customers</span>.

<br/><Link to="#gallery" onClick={()=>scrollToSection("gallery")}>
            <button id="learn-more-btn">Learn more</button> &nbsp;
          </Link>
        </p>
       
      </div>
    </div>
  );
};

export default HomePageSection;
