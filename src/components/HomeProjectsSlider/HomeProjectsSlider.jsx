import React from "react";
import Buttton from "react-bootstrap/Button";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./HomeProjectsSlider.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import settings from "../settings.json";

function HomeProjectsSlider(props) {
  return (
    <Container className="carousel-container">
      <div className="carousel-left"></div>
      <Carousel variant="dark" className="carousel" slide={false} fade>
        {props.projects.map((project, index) => {
          return (
            <Carousel.Item interval={1500}>
              <img
                className="img-thumbnail"
                src={project.image.replace(
                  "http://localhost:5000",
                  `${settings.server_domain}`
                )}
              />
              {/* <Carousel.Caption>
                <div className="slider-meta-container">
                  <Link to={`/payment/${project.id}`}>
                    <button>Join</button>
                  </Link>
                </div>
              </Carousel.Caption> */}
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="carousel-right"></div>
    </Container>
  );
}

export default HomeProjectsSlider;
