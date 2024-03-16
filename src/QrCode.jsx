import { useState } from "react";
export const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState(
    "https://github.com/js2kdeveloper/QR-CODE"
  );
  const [qrSize, setQrSize] = useState("150");
  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${qrData}`;
      setImg(url);
    } catch (error) {
      console.log("Error Generating QR Code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrCode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log("Error Downloading QR Code", error);
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please Wait.....</p>}
      {img && <img src={img} className="qr-code-image" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR Code
        </label>
        <input
          type="text"
          value={qrData}
          id="dataInput"
          placeholder="Enter data for QR Code"
          onChange={(e) => setQrData(e.target.value)}
        />
        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g., 250);
        </label>
        <input
          value={qrSize}
          type="text"
          id="sizeInput"
          onChange={(e) => setQrSize(e.target.value)}
          placeholder="Enter Image Size"
        />
        <button
          className="generate-button"
          onClick={generateQR}
          disabled={loading}
        >
          Generate QR Code
        </button>
        <button className="download-button" onClick={downloadQR}>
          DownLoad QR Code
        </button>
      </div>
      <p className="footer">
        Designed By{" "}
        <a href="https://github.com/js2kdeveloper/QR-CODE">js2kdeveloper</a>
      </p>
    </div>
  );
};
