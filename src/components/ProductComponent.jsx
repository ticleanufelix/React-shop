import { Link } from 'react-router-dom';
import { urlFor } from '../helpers/client';

/* eslint-disable react/prop-types */
export default function ProductComponent({ productProps }) {

  return (
    <div>
      <Link to={`/product/${productProps.slug.current}`}>
        <div className="product-card">
          <img
            src={productProps.image && urlFor(productProps.image[0]).url()}
          />
        </div>
      </Link>
    </div>
  );
}
