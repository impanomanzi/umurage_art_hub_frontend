import settings from "../settings.json"

function ThreeGallery({ onLoad, id, custId}) {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <iframe
        src={`${settings.gallery}?id=${id}&key=${custId}`}
        width="100%"
        height="100%"
        style={{
          border: "none",
          display: "block",
          position: "relative",
          backgroundColor: "#000",
        }}
        allowFullScreen
        title="Three Gallery"
        onLoad={onLoad}
      ></iframe>
    </div>
  );
}

export default ThreeGallery;
