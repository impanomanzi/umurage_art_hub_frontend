function CustomLoadingButton(props) {
  const { isLoading, onClick, text, buttonType } = props;
  const handleOnclick = async () => {
    onClick ? await onClick() : null;
  };

  return (
    <button
      className="btn btn-primary"
      disabled={isLoading ? true : false}
      onClick={handleOnclick}
      type={buttonType}
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
