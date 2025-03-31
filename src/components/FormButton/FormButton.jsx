 function CustomLoadingButton({ isLoading, onClick, text, buttonType, variant, icon, id } ) {
 
  const handleOnclick = async () => {
    onClick ? await onClick() : null;
  };

  return (
    <button
      className={`btn btn-primary w-100 mt-2 ${variant}`}
      disabled={isLoading ? true : false}
      onClick={handleOnclick}
      type={buttonType}
      style={{
        borderRadius: "0px",
      }}
      id={id}
    >
      {isLoading && (
       <div
       className="spinner-border"
       role="status"
       style={{
         width: "1em",
         height: "1em",
         borderWidth: "0.2em",
         display: "inline-block",  
         marginRight: "0.5em",     
       }}
     ></div>
      )}
      {icon}
      {text}
    </button>
  );
}

export default CustomLoadingButton;
