function ThreeGallery() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="https://umurage-gallery.onrender.com/"
        width="100%"
        height="100%"
        style={{ border: "none", display: "block", position: "relative" }}
        allowFullScreen
        title="Three Gallery"
      ></iframe>
    </div>
  );
}

export default ThreeGallery;
