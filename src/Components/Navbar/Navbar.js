
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import React from 'react'
import logo from "../../assest/commerce.png"
import useStyles from "./style"
import {Link,useLocation} from "react-router-dom"

const Navbar = ({totalItems}) => {
    const classes = useStyles()
    const location = useLocation()

   
    return (
        <>
            <AppBar position="fixed" color='inherit' className={classes.Appbar}>
                <Toolbar>
                    <Typography className={classes.title} component={Link} to="/" >
                        <img src={logo} alt="commerce.png" height="25px" className={classes.image}/>
                        E-commerce
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname=='/' ? (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="show cart Items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>

                    ):null}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
