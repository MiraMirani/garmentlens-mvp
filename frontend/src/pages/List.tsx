import { useEffect, useState } from "react";
import { buildImageUrl, fetchGarments, type Garment } from "../api/client";

function ListPage() {
  const [garments, setGarments] = useState<Garment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGarments();
        setGarments(data);
        setError(null);
      } catch {
        setError("Failed to load garments");
      }
    };

    load();

    const timer = setInterval(load, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
      <div>
        <h2>Garments</h2>
        {error && <p>{error}</p>}

        {garments.map((g) => (
            <div key={g.id}>
              <img src={buildImageUrl(g.imagePath)} alt="" width={180} />
              <p><strong>ID:</strong> {g.id}</p>
              <p><strong>Status:</strong> {g.status}</p>

              {g.type ? (
                  <>
                    <p>Type: {g.type}</p>
                    <p>Damage: {g.damage ?? "-"}</p>
                    <p>Material: {g.material ?? "-"}</p>
                    <p>Complexity: {g.complexity ?? "-"}</p>
                  </>
              ) : (
                  <p>Classification pending...</p>
              )}
            </div>
        ))}
      </div>
  );
}

export default ListPage;