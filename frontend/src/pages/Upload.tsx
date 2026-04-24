import { useState, type FormEvent } from "react";
import { uploadGarment } from "../api/client";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!selectedFile) {
      setMessage("Please select an image first.");
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setMessage("Only JPG, PNG, and WEBP images are allowed.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setMessage("File is too large. Max size is 2 MB.");
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const garment = await uploadGarment(selectedFile);
      setMessage(`Uploaded garment #${garment.id}. Status: ${garment.status}.`);
      setSelectedFile(null);
      form.reset();
    } catch {
      setMessage("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1>Upload</h1>
        <p>Add one garment image.</p>
      </div>

      <form className="panel form" onSubmit={onSubmit}>
        <label className="field" htmlFor="garment-image">
          <span>Garment image</span>
          <input
            id="garment-image"
            className="file-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;

              if (!file) {
                setSelectedFile(null);
                return;
              }

              if (!ALLOWED_TYPES.includes(file.type)) {
                setSelectedFile(null);
                setMessage("Only JPG, PNG, and WEBP images are allowed.");
                event.currentTarget.value = "";
                return;
              }

              if (file.size > MAX_FILE_SIZE_BYTES) {
                setSelectedFile(null);
                setMessage("File is too large. Max size is 2 MB.");
                event.currentTarget.value = "";
                return;
              }

              setMessage(null);
              setSelectedFile(file);
            }}
          />
        </label>

        {selectedFile && <p className="muted">Selected: {selectedFile.name}</p>}

        <button className="button" type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </section>
  );
}

export default UploadPage;
