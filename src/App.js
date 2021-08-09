import React, { useState, useEffect } from "react";
import Products from "./Components/Produts";
import Navbar from "./Components/Navbar/Navbar";
import { commerce } from "./lib/commerce";
import Cart from "./Components/Cart/Cart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CheckOut from "./Components/checkout/CheckOut";
function App() {
  const [produts, setProduts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMgs,setErrorMsg] = useState('')

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProduts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handelAddtoCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };
  const handleUpdateCartQuty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };
  const handleRemoveItem = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };
  const handleEmptyCard = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };
  const handleCaptureCheckOut = async (checkOutTokenId, newOrder) => {
    try {
      const incomingOrders = await commerce.checkout.capture(
        checkOutTokenId,
        newOrder
      );
      setOrder(incomingOrders);
      refreshCart()
    } catch (error) {
      setErrorMsg(error.data.error.message)
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart.line_items);
  // console.log(produts);
  return (
    <Router>
      <div className="App">
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products produts={produts} onAddToCart={handelAddtoCart} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQuty={handleUpdateCartQuty}
              handleRemoveItem={handleRemoveItem}
              handleEmptyCard={handleEmptyCard}
            />
          </Route>
          <Route exact path="/checkout">
            <CheckOut cart={cart}
            order={order}
            handleCaptureCheckOut={handleCaptureCheckOut}
            error={errorMgs}
            handleEmptyCard={handleEmptyCard}
            
             />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
