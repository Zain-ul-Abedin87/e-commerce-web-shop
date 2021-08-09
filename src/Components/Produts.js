import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./productStyle";
// const produts = [
//   {
//     id: 1,
//     name: "shoes",
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
//     price: 4,
//     description: "Running shoes",
//   },
//   {
//     id: 2,
//     name: "shirt",
//     description: "Dress shirt",
//     price: 4,
//     image:
//       "https://media.gettyimages.com/photos/canvas-shoes-picture-id171224469?s=612x612",
//   },
// ];
const Produts = ({produts,onAddToCart}) => {

  const classes=useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
      <Grid container justify="center" spacing={4}>
        {produts.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <Product item={item} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Produts;
