import './styles/header.scss';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/features/user";
import { getProducts, clearCart } from "../../../redux/features/products";
import Label from '../../atoms/label/Label';
import Link from '../../atoms/link/Link';
import IconButton from '@mui/material/IconButton';
import CartIcon from '@mui/icons-material/LocalMall';
import LogoutIcon from '@mui/icons-material/Logout';
import { labelTypes, titles, linkLabels, loginStatus } from '../../../constants';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = localStorage.getItem('loggedIn') ? parseInt(localStorage.getItem('loggedIn')) : loginStatus.loggedOut;
    
    // get data from redux store
    const cartTotalItems = useSelector((state) => state.products.cartTotalItems);

    // redirect to home when click header logo 
    const goToHome = () => {
        if (loginStatus.loggedIn === isLoggedIn) {
            navigate("/home");
            dispatch(getProducts());
        } else {
            navigate('/');
        }
    }

    // redirect to cart page
    const goToCart = () => {
        navigate("/cart");
    }

    // logout
    const signout = () => {
        dispatch(clearCart());
        dispatch(logout());
        navigate("/");
    }

    return (
        <Fragment>
            <div className="top-header">
                <Label type={labelTypes.topHeader} text={titles.topHeaderTitle}/>
                <div className='link-wrapper'>
                    <Link labelType={labelTypes.topLink} labelText={linkLabels.helpCenter} isSeperator/>
                    <Link labelType={labelTypes.topLink} labelText={linkLabels.downloadApp}/>
                </div>
            </div>
            <div className="header">
                <div className='header-title' onClick={goToHome}>
                    <Label type={labelTypes.header} text={titles.headerTitle}/>
                </div>
                <div className='header-btn-wrapper'>
                    {loginStatus.loggedIn === isLoggedIn && 
                        <Fragment>
                            <IconButton className='icon-btn' onClick={goToCart}>
                                <CartIcon />
                                {cartTotalItems > 0  && <div className='cart-count-indicator'>{cartTotalItems}</div>}
                            </IconButton>
                            <div className='logout-icon'>
                                <LogoutIcon onClick={signout}/>
                            </div>
                        </Fragment>
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default Header;