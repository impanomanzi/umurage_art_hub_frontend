import { useEffect, useState } from "react";
import "../FormTemplate/FormTemplate.css";
import "bootstrap/dist/css/bootstrap.css";
import "./ExhibitionImagesForm.css";
import CustomLoadingButton from "../../FormButton/FormButton";
import { validateFileType } from "../../../FileValidation/FileValidation";
import { API } from "../../../API/serverRequest";
import useToast from "../../../hooks/useToast";
function ExhibitionImagesForm() {
  const { setToast } = useToast();
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showAudioPreview, setShowAudioPreview] = useState(false);
  const [paintingImage, setPaintingImage] = useState("");
  const [paintingName, setPaintingName] = useState("");
  const [paintingDescription, setPaintingDescription] = useState("");
  const [paintingAudio, setPaintingAudio] = useState("");
  const [paintingOwner, setPaintingOwner] = useState("");
  const [paintingExhibititon, setPaintingExhibititon] = useState("");
  const [exhibitions, setExhibitions] = useState([]);
  const [painters, setPainters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const acceptedImageFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const acceptedAudioFileTypes = [
    "audio/mp3",
    "audio/m4a",
    "audio/wav",
    "audio/mpeg",
  ];
  const [imageFileError, setImageFileError] = useState(false);
  const [audioFileError, setAudioFileError] = useState(false);
  const FILE_ERROR = "the file you selected is not supported.";
  const getExibitions = async () => {
    try {
      const resp = await API.getAllExhibitions();
      if (resp.success) {
        setExhibitions(resp.data);
      } else {
        throw new Error(resp.message);
      }
    } catch (error) {}
  };

  const getPainters = async () => {
    try {
      const data = await API.getPainters();
      if (data) {
        setPainters(data);
      } else {
        throw new Error(data.data);
      }
    } catch (error) {}
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("name", paintingName);
      formData.append("description", paintingDescription);
      formData.append("image", paintingImage);
      formData.append("audio", paintingAudio);
      formData.append("owner", paintingOwner);
      formData.append("ex", paintingExhibititon);
      const resp = await API.addExhibitionPainting(formData);
      if (resp.success) {
        setToast({ variant: "success", message: "Painting uploaded" });
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPainters();
    getExibitions();
  }, []);

  return (
    <>
      <div className="exhibition-paintings-container">
        <div className="payment-registration-form-container m-3">
          <form onSubmit={handleOnSubmit} className="painting-form">
            <h2>ADD EXHIBITION'S PAINTINGS</h2>
            <div className="form-group">
              <select
                name="painter"
                required
                className="form-control"
                defaultValue={paintingExhibititon}
                onChange={(e) => {
                  setPaintingExhibititon(e.target.value);
                }}
              >
                <option value="Select Exhibitions" selected disabled>
                  Select Exhibitions
                </option>
                {exhibitions.length ? (
                  exhibitions?.map((item, index) => {
                    return (
                      <option
                        style={{ color: "black" }}
                        value={item.name}
                        key={index}
                      >
                        {item.name}
                      </option>
                    );
                  })
                ) : (
                  <option disabled>Loading ...</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <select
                name="exhibition"
                className="form-control mt-2"
                onChange={(e) => {
                  setPaintingOwner(e.target.value);
                }}
                defaultValue={paintingOwner}
              >
                <option value="select painter" selected disabled>
                  select painter
                </option>
                {painters.length ? (
                  painters.map((item, index) => {
                    return (
                      <option value={item.username} key={index}>
                        {item.username}
                      </option>
                    );
                  })
                ) : (
                  <option disabled>Loading ...</option>
                )}
              </select>
            </div>
            <div className="painting-image-container">
              <div className="form-group">
                <label htmlFor="painting" className="col-form-label">
                  <b>Painting image</b>
                </label>

                <input
                  type="file"
                  className="form-control-file"
                  required
                  accept=".jpg,.jpeg,.png"
                  onChange={(event) => {
                    validateFileType(
                      event,
                      acceptedImageFileTypes,
                      setPaintingImage,
                      setShowImagePreview,
                      setImageFileError
                    );
                  }}
                />
                {imageFileError && (
                  <div className="alert alert-danger">
                    {FILE_ERROR} <br />
                    Suported files are .png, .jpg, .jpeg
                  </div>
                )}
                {showImagePreview && (
                  <div className="previewImage">
                    <img
                      src={URL.createObjectURL(paintingImage)}
                      alt=""
                      width="200px "
                      style={{ "border-radius": "10px;" }}
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="painting-sound" className="col-form-label">
                  <b>Painting Sound</b>
                </label>

                <input
                  type="file"
                  className="form-control-file"
                  required
                  accept=".mp3,.wav,.m4a,.mpeg"
                  onChange={(event) => {
                    validateFileType(
                      event,
                      acceptedAudioFileTypes,
                      setPaintingAudio,
                      setShowAudioPreview,
                      setAudioFileError
                    );
                  }}
                />
                {audioFileError && (
                  <div className="alert alert-danger">
                    {FILE_ERROR} <br />
                    Suported files are .mp3, .m4a, .wav
                  </div>
                )}
                {showAudioPreview && (
                  <div className="soundPreview">
                    <audio
                      src={URL.createObjectURL(paintingAudio)}
                      controls="controls"
                      preload="auto"
                      loop
                    ></audio>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="painting-name"
                  className="col-sm-2 col-form-label"
                >
                  NAME
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setPaintingName(event.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="painting-description"
                  className="col-sm-2 col-form-label"
                >
                  DESCRIPTION
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  required
                  onChange={(event) => {
                    setPaintingDescription(event.target.value);
                  }}
                />
              </div>
              <CustomLoadingButton
                isLoading={isLoading}
                onClick={null}
                text="Add"
                buttonType="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ExhibitionImagesForm;
