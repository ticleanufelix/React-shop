import { useEffect, useState } from 'react';
import getProducts from '../api/getProducts';
import HeroBanner from '../components/HeroBanner';
import ProductComponent from '../components/ProductComponent';

function Products() {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    getProducts().then(data => {
      setProducts(data[0]); //functia getProducts returneaza array-ul "data" ce contine alte doua array-uri (array-ul "products si array-ul "bannerData")
      setBanner(data[1]);
    });
  }, []);

  return (
    <div>
      <HeroBanner bannerProps={banner.length > 0 && banner[0]} />
      {/* Folosin && cand vrem sa verificam conditia si sa afisam doar o informatie; Folosim ? :   (turnary operator) atunci cand vrem sa verificam o conditie si sa afisam informatii in functie de conditie; Folosim || il va trimite doar pe cel adevarat sau nimic daca ambele sunt false; Folosim ?? pentru a verifica daca ce e in stanga este null/undefined => se afiseaza ce e in treapta, altfel se afiseaza ce e in stanga. */}
      <div className="products-heading">
        <h2>Best products ever!</h2>
      </div>
      <div className="products-container">
        {products.map(product => (
          <ProductComponent
            key={product._id}
            productProps={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
