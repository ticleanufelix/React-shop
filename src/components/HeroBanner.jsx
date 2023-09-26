import { Link } from "react-router-dom";
import { urlFor } from "../helpers/client";

/* eslint-disable react/prop-types */
function HeroBanner({ bannerProps }) {
  console.log(bannerProps);
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">
          {bannerProps.smallText}
        </p>
        <h3>{bannerProps.midText}</h3>
        <h1>{bannerProps.largeText1}</h1>
        <img
          className="hero-banner-image"
          src={
            bannerProps.image &&
            urlFor(bannerProps.image)
          }
          alt="HeadphonesC1"
        />
        <div>
          <Link
            to={`/product/${bannerProps.product}`}
          >
            <button>
              {bannerProps.buttonText}
            </button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{bannerProps.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
