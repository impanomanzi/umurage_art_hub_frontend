import "./MultiStepProgressBar.css";

function MultiStepProgressBar(props) {
  return (
    <div className="multi-step-progressbar-container">
      {props.options.map((item, index) => {
        return (
          <div className={`progress-circle-container `} key={item}>
            <div className="circle-content">
              <span
                className={`progress-circle ${
                  props.activeElement >= index + 1 && "active-element"
                }`}
                style={{
                  borderColor:
                    props.activeElement >= index + 1 ? "green" : "gray",
                }}
              >
                {props.activeElement >= index + 1 ? (
                  <i className="fas fa-check"></i>
                ) : (
                  index + 1
                )}
              </span>
              {index != props.options.length - 1 && (
                <p
                  className={`line-indicator ${
                    props.activeElement >= index + 1 && "active-element"
                  }`}
                  style={{
                    backgroundColor:
                      props.activeElement >= index + 1 ? "green" : "gray",
                  }}
                ></p>
              )}
            </div>
            <p className={`circle-description lead`}>{item}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MultiStepProgressBar;
