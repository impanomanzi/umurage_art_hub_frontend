import { Carousel, Container } from "react-bootstrap";
import "./HomeProjectsSlider.css";
import "bootstrap/dist/css/bootstrap.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

function HomeProjectsSlider({projects, onClick}) {
  return (
    <Container className="carousel-container" style={{ borderRadius: "0px" }}>
      <Carousel className="carousel" slide={false} fade onClick={onClick}>
        {projects.map((project, _) => {
          let imageUrl = project.image;
          let index1 = imageUrl.indexOf("upload/") + "upload/".length;
          let newUrl =
            imageUrl.substring(0, index1) +
            "q_auto:best/" +
            imageUrl.substring(index1, imageUrl.length);
          return (
            <Carousel.Item interval={5000} key={index1+ Math.random()}>
              <LazyLoadImage
                src={newUrl}
                effect="blur"
                placeholderSrc="/placeholder.png"
                width={"280px"}
                height={"300px"}
                style={{ pointerEvents: "none", borderRadius: "0px" }}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
}

export default HomeProjectsSlider;
