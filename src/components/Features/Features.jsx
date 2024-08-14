import "./Features.css";

const HomePageSection = () => {
  return (
    <div className="home-page-section">
      <div className="content">
        <h1 className="title">Umurage Art Hub</h1>
        <p className="description">
          we bring art to life by organizing captivating exhibitions and
          offering innovative virtual
          <a href="#galleries">
            &nbsp;
            <mark>galleries</mark> &nbsp;
          </a>
          for painters to showcase their work.
        </p>
        <a href="#about" className="learn-more-btn">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default HomePageSection;
