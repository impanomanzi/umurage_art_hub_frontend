import React from "react";
import { Container } from "react-bootstrap";
import "./HomeProjectSliderSkeleton.css";

function HomeProjectsSliderSkeleton() {
  return (
    <Container className="carousel-container">
      <div className="carousel-skeleton">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="skeleton-item" key={index}>
            <div className="skeleton-image"></div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default HomeProjectsSliderSkeleton;
