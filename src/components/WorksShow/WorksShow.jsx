import Carousel from "react-bootstrap/Carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import usePaintings from "../../hooks/usePaintings";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import "./WorksShow.css"
function WorksShow() {
  const { paintings } = usePaintings();

  const removeDuplication = (array) => {
    const seenOwners = new Set();
    return array.filter((item) => {
      if (seenOwners.has(item.owner)) {
        return false;
      } else {
        seenOwners.add(item.owner);
        return true;
      }
    });
  };
  const painters = useMemo(() => {
    const galleryOwners = paintings?.data?.map((gallery) => gallery);
    return removeDuplication(galleryOwners);
  }, [paintings]);

  return (
    <div
      style={{
        width: "250px",
        margin: "0 auto",
        zIndex: 1000,
      }}
    >
      <Carousel indicators={false} interval={1500} fade>
        {painters.map((painter, index) => (
          <Carousel.Item key={index} className="text-center">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <LazyLoadImage
                width={80}
                height={80}
                alt={painter.owner}
                style={{ borderRadius: "50%" }}
                src={painter.profile}
              />
              <Link
                id="main-text"
                style={{ color: "white" }}
                to={`/gallery/${painter.owner}`}
              >
                {painter.owner}
              </Link>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default WorksShow;
