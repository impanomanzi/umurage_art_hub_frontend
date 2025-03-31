import { useEffect, useState, useMemo } from "react";
import useToast from "../../hooks/useToast";
import { API } from "../../API/serverRequest";
import "./Painters.css";
import HomePainterCard from "../HomePainterCard/HomePainterCard";
function Painters() {
 
  const [query, setQuery] = useState("");
   
    const[profiles, setProfiles]= useState([])
    const processedProfiles= useMemo(() => {
      return profiles?.filter((profile) => profile.username.toLowerCase().includes(query.toLocaleLowerCase()));
      
    }, [profiles, query]);

    const{setToast}= useToast()
    const getProfiles = async () => {
        try {
          const resp = await API.getProfiles();
          if (resp.success) {
            setProfiles(resp.data);
          } else {
            setToast({ variant: "danger", message: resp.message });
          }
        } catch (error) {
          setToast({ variant: "danger", message: error.message });
        }
      };

    useEffect(()=>{
        getProfiles()
      },[])
  return (
    <div className="profiles-outer-container">
      <p className="section-description">We have a talented team of over {profiles.length} skilled painters who dedicate themselves to delivering exceptional results on every project. With a passion for their craft, they continuously refine their techniques, staying current with the latest trends and advancements in the painting industry to ensure the highest quality work.</p>
      <div
        className="btn-group search-box-container"
        role="group"
        aria-label="button group for filtering and sorting exhibitions"
      >
        <input
          type="text"
          placeholder="Search by painter name"
          className="search-input"
          onChange={(event) => setQuery(event.target.value)}
          
        />
        
      </div>
      <div className="profiles-container">
          {processedProfiles.length>0?processedProfiles.map((profile, index)=>{
              return <HomePainterCard profileData={profile} key={index}/>
          }):<p>No painter found</p>}
      </div>
    </div>
  )
}

export default Painters