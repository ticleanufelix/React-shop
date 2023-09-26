import { useStateContext } from "../context/Context";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {urlFor} from "../helpers/client"
import DeleteIcon from '@mui/icons-material/Delete';
import getStripe from "../helpers/getStripe";
import { toast } from "react-hot-toast";

function Cart() {
  const { setShowCart, quantity, cartItems, totalPrice, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch(
      'http://localhost:5500/api/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      },
    );
    if (response.statusCode === 500) return;
    const data = await response.json();
    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.id });
  };


  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button className="cart-heading" onClick={() => setShowCart(false)}>
          <KeyboardArrowRightIcon />
          <span className="heading">Your cart</span>
          <span className="cart-num-items">({quantity} items)</span>
        </button>
        <div className="product-container">
          {cartItems?.length>0 && cartItems?.map((item, index)=>(
            <div key={item?._id||index} className="product">
              <img className="cart-product-image" src={item?.image && urlFor(item?.image[0]).url()} alt="" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item?.name}</h5>
                
                  <h4>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(item?.price*item?.quantity) } </h4>
                </div>
                <span>{item?.quantity} pc</span>
                <div className="flex bottom">
                  <button className="remove-item" onClick={()=>onRemove(item)}><DeleteIcon/> </button>
                </div>
              </div>
            </div>

          ))}
        </div>
       
            {cartItems.length>0 && (
              <div className="cart-bottom">
                  <div className="total">
                    <h3>Total:</h3>
                    <h3>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(totalPrice)}</h3>
                  </div>
                  <div className="btn-container">
                    <button className="btn" onClick={handleCheckout}>Pay with Stripe</button>
                  </div>
              </div>
            )}
        
      </div>
    </div>
  );
}

export default Cart;
