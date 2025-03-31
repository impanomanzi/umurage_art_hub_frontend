import Viewer from "react-viewer"
import useImageViewer from "../../hooks/useImageViewer";
import { useEffect, useState } from "react";
import "./ImageViewer.css"
function ImageViewer() {
    const{key,image}= useImageViewer()
    const[visible, setVisible]= useState(false)
    useEffect(()=>{
        if (image){
            setVisible(true);
        }
    }, [key])
  return <Viewer
  visible={visible}
  onClose={() => setVisible(false)}
  className="image-viewer"

  images={[
    {
      src: image,
      alt: "",
    },
  ]}
  noImgDetails
  noNavbar
  changeable
/>
}

export default ImageViewer