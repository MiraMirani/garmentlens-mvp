const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

interface ApiResponse<T> {
  result: T;
  message: string;
  error: boolean;
}

export interface Garment {
  id: number;
  status: string;
  imagePath: string;
  type: string | null;
  damage: string | null;
  material: string | null;
  complexity: string | null;
  classifier: string | null;
  createdAt: string;
  updatedAt: string;
}

export const buildImageUrl = (imagePath: string) => {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return `${API_BASE_URL}${imagePath}`;
};

export const uploadGarment = async (file: File): Promise<Garment> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/garments`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const garment: Garment = await response.json();
  return garment;
};

export const fetchGarments = async (): Promise<Garment[]> => {
  const response = await fetch(`${API_BASE_URL}/garments`);

  if (!response.ok) {
    throw new Error("Failed to fetch garments");
  }

  const payload: ApiResponse<Garment[]> = await response.json();
  return payload.result;
};
