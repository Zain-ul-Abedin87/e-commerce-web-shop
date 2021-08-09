import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";

const CartItem = ({ item ,updateQuantity, removeItem}) => {
  const classes = useStyles();

  //   const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

  //   const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <Card className={classes.cartItem}>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography>{item.name}</Typography>
        <Typography>{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={()=>updateQuantity(item.id,item.quantity-1)}>
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small" onClick={()=>updateQuantity(item.id,item.quantity+1)}>
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          className={classes.RmoveButton}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
