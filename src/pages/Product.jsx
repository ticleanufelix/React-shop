import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getProduct from "../api/getProduct";
import { urlFor } from "../helpers/client";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ProductComponent from "../components/ProductComponent"
import { useStateContext } from "../context/Context";

function Product() {
  const [products, setProducts] = useState([]); //in mod normal am fi facut asta cu un Context, insa asta e o alta varianta
  const [product, setProduct] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const { slug } = useParams();
  const{onAdd, qty, setQty } = useStateContext();
  useEffect(() => {
    getProduct(slug).then((data) => {
      setProducts(data[0]); //functia getProducts returneaza array-ul "data" ce contine alte doua array-uri (array-ul "products si array-ul "product")
      setProduct(data[1]);
    });
  }, [slug]);

  


  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={product.image && urlFor(product.image[imageIndex])}
              alt=""
            />
          </div>
          <div className="small-images-container">
            {/* ? inseamna o verificare; daca  nu exista product nu face mai departe .image  */}
            {product?.image?.map((imageSource, index) => (
              <img
                key={index}
                src={imageSource && urlFor(imageSource)}
                className={
                  imageIndex === index
                    ? "small-image selected-image"
                    : "small-image"
                }
                onMouseEnter={() => setImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{product.name}</h1>
          <div className="reviews">
            <div>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarHalfIcon />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{product.details}</p>
          <p className="price">Price: {product.price}$</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={()=>setQty((prevState)=>prevState<2 ? 1 : prevState-1)}><RemoveIcon/></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={()=>setQty((prevState)=>prevState+1)}><AddIcon/></span>
            </p>
          </div>
          <div className="buttons">
          <button className="add-to-cart" onClick={()=>onAdd(product, qty)}>Add to cart</button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper"><h2>You may also like</h2>
      <div className="marquee">
        <div className="maylike-products-container track">
          {products.map((item)=>(<ProductComponent key={item._id} productProps={item}/>))}
           </div>
      </div>
      </div>
    </div>
  );
}

export default Product;
