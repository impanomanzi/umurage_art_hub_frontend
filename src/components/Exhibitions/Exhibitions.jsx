import "./Exihibitions.css";
import { useEffect, useMemo, useRef, useState } from "react";
import ExhibitionCard from "../ExhibitionCard/ExhibitionCard";
import useExhibitions from "../../hooks/useExhibitions";
import  Dropdown  from "react-bootstrap/Dropdown";
const CARD_WIDTH = 296;

function Exhibitions() {
  const { exhibitions } = useExhibitions();
  const [query, setQuery] = useState("");
  const [sortDirection, setSortDirection]= useState("Latest")
  const containerRef = useRef();
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hideRight, setHideRight] = useState(false);
  const filteredExhibitions = useMemo(
    () =>
      exhibitions?.filter((exhibition) =>
        exhibition.name.toLowerCase().includes(query.toLowerCase())
      ),
    [exhibitions, query]
  );

  const processedExhibitions = useMemo(() => {
    const sortedExhibitions = [...filteredExhibitions];
    return sortDirection === "Latest"
      ? sortedExhibitions.sort((a, b) => new Date(a.startdate) - new Date(b.startdate))
      : sortedExhibitions.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
  }, [filteredExhibitions, sortDirection]);
  


 useEffect(()=>{
  if(containerRef.current){
    containerRef.current.scrollLeft =0
   }
 }, [sortDirection, query, exhibitions])

  useEffect(() => {
    const container = containerRef.current;

    const updateScroll = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setScrollPosition(container.scrollLeft);
      setHideRight(container.scrollLeft >= maxScrollLeft - 1);  
    };

    container.addEventListener("scroll", updateScroll);

    return () => {
      container.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    if (leftRef.current) {
      leftRef.current.addEventListener("click", () => {
        containerRef.current.scrollLeft -= CARD_WIDTH;
      });
    }

    if (rightRef.current) {
      rightRef.current.addEventListener("click", () => {
        containerRef.current.scrollLeft += CARD_WIDTH;
      });
    }
  }, [scrollPosition]);

  return (
    <div className="exhbitions-netflix-outer-container">
    <div className="netflix-header">
    <h3  className="exhbition-header">Current Exhibitions</h3>
    <input
          type="text"
          placeholder="Search by exhibitions name"
          className="netflix-search-input"
          onChange={(event) => setQuery(event.target.value)}
         
        />
    <Dropdown className="netflix-dropdown">
          <Dropdown.Toggle className="netflix-dropdown-toggle" >
            {sortDirection}
          </Dropdown.Toggle>
          <Dropdown.Menu className="netflix-dropdown-menu">
              <Dropdown.Item onClick={()=>setSortDirection("Latest")}>
                 <Dropdown.ItemText>
                  Latest
                 </Dropdown.ItemText>
                
              </Dropdown.Item>
              <Dropdown.Item onClick={()=>setSortDirection("Old")}>
              <Dropdown.ItemText>
                  Old
                 </Dropdown.ItemText>
              </Dropdown.Item>
           
          </Dropdown.Menu>
        </Dropdown>
    </div>
      
      <div className="exhibitions-outer-container">
          <button ref={leftRef} className={`btn scroll-btn ${scrollPosition > 0 ? "visible":"hidden"}` }>
            <i className="fa fa-chevron-left"></i>
          </button>
       

        <div
          className="exhibitions-container"
          id="exhibitions-container"
          ref={containerRef}
        >
          {processedExhibitions.length>0?processedExhibitions?.map((exhibition, index) => (
            <ExhibitionCard
              exhibition={exhibition}
              key={exhibition.name}
            />
          )):<p className="netflix-no-content">No Exhibition found.</p>}
        </div>

       
          <button ref={rightRef} className={`btn scroll-btn ${!hideRight  ? "visible":"hidden"}`}>
            <i className="fa fa-chevron-right"></i>
          </button>
        
      </div>
    </div>
  );
}

export default Exhibitions;
