import { useContext } from "react"
import ImageViewerContext from "../Contexts/ImageViewerContext"

function useImageViewer() {
  return useContext(ImageViewerContext)
}

export default useImageViewer