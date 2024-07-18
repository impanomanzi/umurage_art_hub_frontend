import { useState, useRef } from "react";

const ProductImageZoom = ({ src, alt, zoomFactor = 2 }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef(null);
  const zoomedImageRef = useRef(null);

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const imageWidth = imageRef.current.offsetWidth;
    const imageHeight = imageRef.current.offsetHeight;

    const zoomedImage = zoomedImageRef.current;
    zoomedImage.style.left = `${
      (offsetX / imageWidth) * (zoomedImage.offsetWidth - imageWidth)
    }px`;
    zoomedImage.style.top = `${
      (offsetY / imageHeight) * (zoomedImage.offsetHeight - imageHeight)
    }px`;
  };

  return (
    <div className="product-image-zoom">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />
      {isZoomed && (
        <div className="zoomed-image-container">
          <img
            ref={zoomedImageRef}
            src={src}
            alt={`${alt} (Zoomed)`}
            style={{ transform: `scale(${zoomFactor})` }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductImageZoom;
