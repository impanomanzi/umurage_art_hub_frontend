import "./FantasticHomeNavbar.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
} from "@mui/material";

function FantasticHomeNavbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const links = [
    { id: "hero", label: "Home", icon: "fas fa-home" },
    { id: "gallery", label: "Galleries", icon: "fas fa-images" },
    { id: "painters", label: "Painters", icon: "fas fa-paint-brush" },
    { id: "about", label: "About", icon: "fas fa-info-circle" },
    { id: "contact", label: "Contact", icon: "fas fa-phone" },
  ];
  // state to track the active state and scroll state
  const[activeLink,setActiveLink]= useState("hero");
  const [isScrolled, setIsScrolled]= useState(false)

  // function to smoothly scroll to a section by its ID
  const scrollToSection= (sectionId)=>{
    const element= document.getElementById(sectionId);
    if(element){
      const marginTop=90;
      const scrollToY= element.getBoundingClientRect().top+window.scrollY-marginTop;
      window.scrollTo({top:scrollToY, behavior:"smooth"});
    }
    setOpenMenu(false)
  }
  // function to determine the active section while scrolling.
  const determineActiveSection= ()=>{
    for(let i= 0; i<links.length;i++){
      const section= document.getElementById(links[i].id);
      if(section){
        const rect= section.getBoundingClientRect();
        if(rect.top<120 && rect.bottom >=120){
          // set the active link based on the section ID.
          setActiveLink(links[i].id);
          break;
        }
      }
    }
  }



  useEffect(()=>{
    const handleScroll= ()=>{
      if(window.scrollY>150){
        setIsScrolled(true);
      }else{
        setIsScrolled(false)
      }

      // call the functin t determine the active section while scrolling.
      determineActiveSection()
    };
    window.addEventListener("scroll", handleScroll);
    return ()=>window.removeEventListener("scroll", handleScroll);
  },[])




  return <nav className={`navbar-container ${isScrolled&&"scrolled"}`}>
    <div>
          <Link to={"/"}>
            <img className="navbar-brand" src="/UMURAGE HEADER.png" alt="Umurage art hub logo" />
          </Link>
        </div>
    <div className="fantstic-nav-container">
      {/* Desktop Links */}
      <ul className="links-container">
        {links.map(({ id, label, icon }) => (
          <li key={id} className="link-item">
            <Link to={`#${id}`} className={activeLink==id?"active":""} onClick={()=>scrollToSection(id)}>
              <i className={icon}></i> {label}
            </Link>
          </li>
        ))}
        <li className="link-item">
          <Link
            to="/sign-in"
            className="btn link-item"
          >
             
            Sign in
          </Link>
        </li>
      </ul>

      {/* Mobile Drawer */}
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor="right"
        className="user-profile-drawer"
        style={{ zIndex: 12001 }}
      >
        <Box sx={{ width: 250 }} className={"mobile-drawer"}>
          <List>
            {links.map(({ id, label, icon }) => (
              <ListItem key={id} className="link-item">
                
                  <Link to={"/"} className={activeLink==id?"active":""} onClick={()=>scrollToSection(id)}>
              <i className={icon}></i> {label}
            </Link>
               
              </ListItem>
            ))}
            <ListItem className="link-item">
              <Link to="/sign-in">
                <i className="fas fa-sign-in-alt"></i> Sign in
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Menu Button */}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="menu-button-bars btn btn-outline-secondary"
        ref={menuRef}
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>
  </nav>;
}

export default FantasticHomeNavbar;
