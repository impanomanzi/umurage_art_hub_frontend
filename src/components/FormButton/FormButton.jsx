function CustomLoadingButton(props) {
  const { isLoading, onClick, text, buttonType } = props;
  const handleOnclick = async () => {
    onClick ? await onClick() : null;
  };

  return (
    <button
      className="btn btn-primary w-100 mt-2"
      disabled={isLoading ? true : false}
      onClick={handleOnclick}
      type={buttonType}
      style={{
        borderRadius: "0px",
      }}
    >
      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {text}
    </button>
  );
}

export default CustomLoadingButton;
