import { createContext } from "react";
import { useState } from "react";

const ImageViewerContext= createContext({});
export function ImageViewerProvider({children}){
    const [image, setImage]= useState(null);
    const [key, setKey]=useState(0)
    const setImageUrl= (url)=>{
        if(image==url){
            setKey(preKey=>preKey+1)
        }else{
            setImage(url);
            setKey(preKey=>preKey+1)

        }

    }
    return <ImageViewerContext.Provider value={{key,image, setImageUrl}}>
        {children}
    </ImageViewerContext.Provider>
}

export default ImageViewerContext