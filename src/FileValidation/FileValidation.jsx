export const validateFileType = (
  event,
  fileTypes,
  callBack,
  setFileViewer,
  setFileError
) => {
  let file = event.target.files[0];
  let valid = false;
  for (let i = 0; i < fileTypes.length; i++) {
    if (fileTypes[i] === file.type) {
      valid = true;
    }
  }
  if (valid) {
    callBack(file);
    setFileError(false);
  } else {
    setFileError(true);
    setFileViewer(false);
    event.target.value = "";
  }
};
