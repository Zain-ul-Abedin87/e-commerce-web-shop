import { Typography, Container, Grid, Button } from "@material-ui/core";
import React from "react";
import CartItem from "./cartItems/cartItem";
import useStyles from "./Style";
import {Link} from "react-router-dom"

function Cart({
  cart,
  handleEmptyCard,
  handleUpdateCartQuty,
  handleRemoveItem,
}) {
  const classes = useStyles();
  let isEmpty = !cart.line_items;
  const EmptyCart = () => (
    <Typography variant="subtitle" align='center'>
      You have no Item in your Shopin cart ,start Adding some  
      <Link to="/" className={classes.link}> Buy Now</Link>!
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} updateQuantity={handleUpdateCartQuty} removeItem={handleRemoveItem}  />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cartDetails}>
        <Typography variant="h6">
          Subtotal:{cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            color="secondary"
            variant="contained"
            onClick={handleEmptyCard}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkCart}
            size="large"
            color="primary"
            variant="contained"
            component={Link} to="/checkout"
          >
            Check Cart
          </Button>
        </div>
      </div>
    </>
  );
  if (!cart.line_items) return "Loading.....";
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3">
        Your Shoiping Card
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart;
