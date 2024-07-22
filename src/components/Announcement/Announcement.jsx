import "./Announcement.css";
import useAnnouncements from "../../hooks/useAnnouncements";

function Announcement() {
  const { announcements } = useAnnouncements();

  return (
    <div className="scroller-container">
      <ul
        className="scroller"
        data-direction="left"
        data-speed="fast"
        data-animated={true}
      >
        <div className="inner-scroller">
          {announcements?.map((item, index) => {
            return (
              <li key={index}>
                <img src={item[3]} width="32px" height="32px" />
                {item[0]}: &nbsp; <b>FROM</b> &nbsp; {item[1]}&nbsp;<b>T0</b>{" "}
                &nbsp;{item[2]}
              </li>
            );
          })}
          {announcements?.map((item, index) => {
            return (
              <li aria-hidden={true} key={index}>
                <img
                  src={item[3]}
                  width="32px"
                  height="32px"
                  style={{ borderRadius: "2px" }}
                />
                {item[0]}: &nbsp; <b>FROM</b> &nbsp; {item[1]}&nbsp;<b>T0</b>{" "}
                &nbsp;{item[2]}
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
}

export default Announcement;
