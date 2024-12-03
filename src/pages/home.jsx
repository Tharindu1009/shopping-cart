import './styles/home.scss';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getProducts, clearError, clearSuccess } from "../redux/features/products";
import Header from "../components/organisms/header/Header";
import Footer from '../components/organisms/footer/Footer';
import ToastAlert from '../components/molecules/alert/ToastAlert';
import FilterPanel from '../templates/filterPanel/FilterPanel';
import ProductList from '../templates/productList/ProductList';
import Snackbar from '@mui/material/Snackbar';

import { loginStatus } from '../constants';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = localStorage.getItem('loggedIn') ? parseInt(localStorage.getItem('loggedIn')) : loginStatus.loggedOut;

    // get data from redux store
    const products = useSelector((state) => state.products.list);
    const { errorStatus, errorMessage } = useSelector((state) => state.products.error);
    const { successStatus, successMessage } = useSelector((state) => state.products.success);
    const loading = useSelector((state) => state.products.loading);

    useEffect(() => {
        if (loginStatus.loggedIn === isLoggedIn) {
            // get products in initial stage
            dispatch(getProducts());
        } else {
            navigate('/');
        }
    }, []);

    const handleErrorClose = (reason) => {
        // close error alert and clear error messages
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearError());
    };

    const handleSuccessClose = (reason) => {
        // close success alert and clear success messages
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearSuccess());
    };

    return (
        <div className='home'>
            {/* start of login page header */}
                <Header/> 
            {/* end of login page header */}
            <FilterPanel />
            <ProductList products={products} loading={loading} />
            {/* Danger Alert */}
            <Snackbar open={errorStatus} autoHideDuration={3000} onClose={handleErrorClose}>
                <ToastAlert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </ToastAlert>
            </Snackbar>
            {/* Success Alert */}
            <Snackbar open={successStatus} autoHideDuration={3000} onClose={handleSuccessClose}>
                <ToastAlert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </ToastAlert>
            </Snackbar>
            <Footer />
        </div>
    )
}

export default Home;