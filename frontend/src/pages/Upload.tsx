import { useState, type FormEvent } from "react";
import { uploadGarment } from "../api/client";

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Please select an image first.");
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const garment = await uploadGarment(selectedFile);
      setMessage(`Uploaded garment #${garment.id}. Status: ${garment.status}.`);
      setSelectedFile(null);

    } catch {
      setMessage("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Garment</h2>
      <form onSubmit={onSubmit}>
        <input
          id="garment-image"
          type="file"
          accept="image/*"
          onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
        />
        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadPage;