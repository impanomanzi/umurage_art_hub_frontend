import "./Announcement.css";

function Announcement() {
  const announcements = ["this website is still under development"];
  return (
    <div className="scroller-container">
      <ul
        class="scroller"
        data-direction="left"
        data-speed="fast"
        data-animated={true}
      >
        <div class="inner-scroller">
          {announcements.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
          {announcements.map((item, index) => {
            return (
              <li aria-hidden={true} key={index}>
                {item}
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
}

export default Announcement;
