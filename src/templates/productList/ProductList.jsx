import './styles/productList.scss';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/features/products";
import Grid from '@mui/material/Grid';
import Card from '../../components/molecules/card/Card';
import Alert from '../../components/molecules/alert/Alert';
import { Rings } from 'react-loader-spinner';

function ProductList({ products, loading }) {
    const dispatch = useDispatch();

    const [listEmptyMessage] = useState("We can't find products matching this keyword.");

    // functon for add product to cart
    const addToCart = (product, quantity) => {
        dispatch(addCartItem(product, quantity));
    }

    return (
        <div className='product-list'>
            {/* List Loader */}
            {loading && <div className='loader'><Rings color="#878787" height={80} width={80} /></div>}
            {/* Item List */}
            <Grid container spacing={2} rowGap={1} justifyContent="center" alignItems="center">
                {products ?
                    products.length > 0 ?
                    products.map((product, i) => (
                            <Grid item xs={12} md={4} lg={3}>
                                <Card key={i} product={product} addToCart={(product, quantity) => addToCart(product, quantity)}/>
                            </Grid>
                        ))
                        : <Alert title={listEmptyMessage} />
                    : null
                }
            </Grid>
        </div >
    )
}

export default ProductList;