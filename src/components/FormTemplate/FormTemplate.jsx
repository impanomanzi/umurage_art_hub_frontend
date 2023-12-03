import "./FormTemplate.css";
import { Link } from "react-router-dom";
function FormTemplate(props) {
  return (
    <div className="payment-registration-form-container">
      <h2>{props.title}</h2>
      <hr />

      <form onSubmit={props.onSubmit}>
        {props.fields.map((item, index) => {
          return (
            <div className="form-inputs-container" key={index}>
              <label htmlFor={item.text}>
                {item.text.toUpperCase().replace("-", " ")}
              </label>
              <input type={item.type} name={item.text} />
            </div>
          );
        })}

        <button>
          <i className={props.icon}></i>
          {props.submitText}
        </button>
      </form>
    </div>
  );
}

export default FormTemplate;
