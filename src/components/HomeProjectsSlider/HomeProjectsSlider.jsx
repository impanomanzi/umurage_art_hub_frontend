import { Carousel, Container, Row, Col } from "react-bootstrap";
import "./HomeProjectsSlider.css";
import "bootstrap/dist/css/bootstrap.css";
import settings from "../settings.json";
import { LazyLoadImage } from "react-lazy-load-image-component";

function HomeProjectsSlider(props) {
  return (
    <Container className="carousel-container">
      <div className="carousel-left"></div>
      <Carousel className="carousel" slide={false} fade>
        {props.projects.map((project, _) => {
          // let imageUrl = project.image;
          // let index1 = imageUrl.indexOf("upload/") + "upload/".length;
          // let newUrl =
          //   imageUrl.substring(0, index1) +
          //   "c_scale,o_100,h_200,w_200/" +
          //   imageUrl.substring(index1, imageUrl.length);

          let imageUrl = project.image;
          let index1 = imageUrl.indexOf("upload/") + "upload/".length;
          let newUrl =
            imageUrl.substring(0, index1) +
            "q_auto:best/" +
            imageUrl.substring(index1, imageUrl.length);
          return (
            <Carousel.Item interval={1500} a>
              <LazyLoadImage
                src={newUrl}
                effect="blur"
                placeholderSrc="/placeholder.png"
                width={"280px"}
                height={"300px"}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
}

export default HomeProjectsSlider;
