import { useRef, useState } from "react";
import CustomLoadingButton from "../../FormButton/FormButton";
import useToast from "../../../hooks/useToast";
import { API } from "../../../API/serverRequest";
function ExhibitionCreationForm() {
  const { setToast } = useToast();
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [fees, setFees] = useState("");
  const [banner, setExhibitionBanner] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("host", host);
      formData.append("start_date", startdate);
      formData.append("end_date", enddate);
      formData.append("entrace_fees", fees);
      formData.append("banner", banner);
      formData.append("banner", banner);
      const resp = await API.addExhibition(formData);
      if (resp.success) {
        setToast({ variant: "success", message: "Exhibition created" });
        formRef.current.reset();
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-registration-form-container m-3">
      <form onSubmit={handleOnSubmit} className="exhibition-form" ref={formRef}>
        <h2>CREATE NEW EXHIBITION</h2>
        <div className="form-group">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            EXHIBITION NAME
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            HOST
          </label>
          <input
            type="text"
            name="host"
            className="form-control"
            required
            onChange={(event) => {
              setHost(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startdate" className="col-sm-2 col-form-label">
            START DATE
          </label>
          <input
            required
            className="form-control"
            type="date"
            name="startdate"
            onChange={(event) => {
              setStartdate(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="enddate" className="col-sm-2 col-form-label">
            END DATE
          </label>
          <input
            type="date"
            name="enddate"
            className="form-control"
            required
            onChange={(event) => {
              setEnddate(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fees" className="col-sm-2 col-form-label">
            ENTRACE FEES
          </label>
          <input
            type="number"
            name="fees"
            className="form-control"
            required
            onChange={(event) => {
              setFees(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="banner" className="col-sm-2 col-form-label">
            EXHIBITION BANNER
          </label>
          <div className="exhibition-preview"></div>
          <input
            type="file"
            required
            className="form-control-file"
            name="banner"
            onChange={(event) => {
              const previewUrl = URL.createObjectURL(event.target.files[0]);
              const el = `<img src="${previewUrl}" width="200px" style="border-radius:20px"/>`;
              event.target.parentElement.querySelector(
                ".exhibition-preview"
              ).innerHTML = el;
              setExhibitionBanner(event.target.files[0]);
            }}
          />
        </div>
        <CustomLoadingButton
          isLoading={isLoading}
          onClick={null}
          text="Add new exhibition"
          buttonType="submit"
        />
      </form>
    </div>
  );
}

export default ExhibitionCreationForm;
