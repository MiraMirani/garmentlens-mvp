import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="page">
      <div className="page-header">
        <p className="eyebrow">The natural choice for all small repairs</p>
        <h1>Upload garments.</h1>
        <p>
            Your digital tailor Make repairs as easy as buying new! GarmentLens is a digital platform for repairing clothes, shoes, and accessories. We partner with tailors, retailers, and brands in Oslo to make repair and tailoring services simpler, better, and more affordable for everyone. "Price and delivery time are good. GarmentLens shows up and helps us if needed. We're very happy, and we see that customers who use GarmentLens through us are happy too!" Mari Gunvaldsen, store manager, Circular

        </p>
      </div>

      <div className="actions">
        <Link to="/upload" className="button">
          Upload garment
        </Link>
        <Link to="/list" className="button secondary">
          View list
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
