import { Link } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateContext } from "../context/Context";
import Cart from "./Cart"

function Navbar() {
  const {quantity, setShowCart, showCart} = useStateContext()
  return (
    <div className="navbar-container">
        <p className="logo">
            <Link to="/">
                Best React Shop Worldwide
            </Link>
        </p>
        <button className="cart-icon" onClick={()=>setShowCart(true)}>
            <ShoppingCartIcon/>
            <span className="cart-item-qty">{quantity}</span>
        </button>
        {showCart && <Cart />}
    </div>
  )
}

export default Navbar