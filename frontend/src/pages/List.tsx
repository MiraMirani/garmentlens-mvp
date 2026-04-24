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
    <section className="page">
      <div className="page-header">
        <h1>Garments</h1>
        <p>.</p>
      </div>

      {error && <p className="message error">{error}</p>}

      {!error && garments.length === 0 && (
        <div className="panel empty-state">
          <h2>No garments yet</h2>
          <p>Upload an image to start the queue.</p>
        </div>
      )}

      <div className="garment-grid">
        {garments.map((garment) => (
          <article className="garment-card" key={garment.id}>
            <img
              src={buildImageUrl(garment.imagePath)}
              alt={`Garment ${garment.id}`}
            />

            <div className="garment-body">
              <div>
                <h2>Garment #{garment.id}</h2>
                <span className={`status ${garment.status}`}>
                  {garment.status}
                </span>
              </div>

              {garment.type ? (
                <dl className="details">
                  <div>
                    <dt>Type</dt>
                    <dd>{garment.type}</dd>
                  </div>
                  <div>
                    <dt>Damage</dt>
                    <dd>{garment.damage ?? "-"}</dd>
                  </div>
                  <div>
                    <dt>Material</dt>
                    <dd>{garment.material ?? "-"}</dd>
                  </div>
                  <div>
                    <dt>Complexity</dt>
                    <dd>{garment.complexity ?? "-"}</dd>
                  </div>
                  <div>
                    <dt>Classifier</dt>
                    <dd>{garment.classifier ?? "-"}</dd>
                  </div>
                </dl>
              ) : (
                <p className="muted">Classification pending...</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ListPage;
