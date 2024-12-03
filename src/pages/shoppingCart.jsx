
import './styles/shoppingCart.scss';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';
import Header from "../components/organisms/header/Header";
import CartList from '../templates/cartList/CartList';
import CheckoutPanel from '../templates/checkoutPanel/CheckoutPanel';
import { loginStatus } from '../constants';

function ShoppingCart() {
    const navigate = useNavigate();

    // get data from redux store
    const products = useSelector((state) => state.products.cart);
    const cartTotalAmount = useSelector((state) => state.products.cartTotalAmount);
    const cartTotalItems = useSelector((state) => state.products.cartTotalItems);

    const isLoggedIn = localStorage.getItem('loggedIn') ? parseInt(localStorage.getItem('loggedIn')) : loginStatus.loggedOut;
    const [cartTotalLabel, setCartTotalLabel] = useState("");

    useEffect(() => {
        // check user login status on initial render
        if (loginStatus.loggedIn !== isLoggedIn) {
            // redirect user to login when unauthorized page visit
            navigate('/');
        }
    }, []);

    useEffect(() => {
        // set cart total label text when updating item count
        setCartTotalLabel(`Total (${cartTotalItems} items) :`);
    }, [cartTotalItems]);

    return (
        <div className='shopping-cart'>
            {/* start of shopping cart page header */}
                <Header/> 
            {/* end of shopping cart page header */}

            <Grid container spacing={2}>
                <Grid item xs={12} md={9} lg={9}>
                    <CartList products={products}/>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <div className='checkout-container'>
                        <CheckoutPanel label={cartTotalLabel} amount={cartTotalAmount}/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ShoppingCart;