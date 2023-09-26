/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

function Context(props) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0); //Cantitatea totala din cos
  const [qty, setQty] = useState(1); //Il folosim pe pagina de produs

  const onAdd = (product, productQty) => {
    const checkProductInCart = cartItems.find(
      (item) => product?._id === item?._id
    );
    // setTotalPrice(totalPrice + product.price * productQty);
    //Set state este asincron asa ca uneori s-ar putea sa trebuiasca scris asa:
    setTotalPrice((prevState) => prevState + product.price * productQty); // asa e cel mai corect
    // setQuantity(quantity + productQty);
    setQuantity((prevState) => prevState + productQty);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item?._id === product._id) {
          return {
            ...item,
            quantity: productQty + item.quantity,
          };
        } else{
        return item
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = productQty;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${productQty} items of ${product.name} were added to cart!`);
  };

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item)=> product._id === item._id)
    const newCartItems = cartItems.filter((item) => product._id !== item._id)
    setTotalPrice((prevState)=> prevState - foundProduct.price*foundProduct.quantity)
    setQuantity((prevState)=> prevState - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  return (
    <CartContext.Provider
      value={{
        onAdd,
        qty,
        setQty,
        quantity,
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        onRemove
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default Context;

export const useStateContext = () => useContext(CartContext);
