import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@material-ui/core";

import useStyles from "./Style";
import { AddShoppingCart } from "@material-ui/icons";

const Product = ({ item,onAddToCart }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={item.media.source}
        title={item.name}
      />
      <CardContent>
        <div className={classes.CardContent}>
          <Typography variant="h5" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="h5">
            {item.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: item.description }}
          color="textSecondary"
        />
      </CardContent>
      <CardActions className={classes.CardActions}>
        <IconButton onClick={()=>onAddToCart(item.id,1)}>
          <AddShoppingCart  />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
