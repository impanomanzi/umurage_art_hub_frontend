import { LazyLoadImage } from "react-lazy-load-image-component"
import useImageViewer from "../../hooks/useImageViewer"
function LazyImageViewer({url}) {
    const{setImageUrl}= useImageViewer()
  return   <LazyLoadImage
    src={`${url}`}
    onClick={()=>setImageUrl(url)}
    effect="blur"
    placeholderSrc="/placeholder.png"
    width={"300px"}
    height="320px"
    style={{ borderRadius: "1em" }}
  />
 }

export default LazyImageViewer