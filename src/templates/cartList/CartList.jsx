import './styles/cartList.scss';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateCartItemQty, removeCartItem } from "../../redux/features/products";
import Label from '../../components/atoms/label/Label';
import CartItemCard from '../../components/molecules/card/CartItemCard';
import Alert from '../../components/molecules/alert/Alert';
import { labelTypes, titles } from '../../constants';

function CartList({ products }) {
    const dispatch = useDispatch();

    const [listEmptyMessage] = useState("Your Cart is Empty!");

    // function of send action for update cart item qty
    const updateItmQty = (product, type) => {
        dispatch(updateCartItemQty(product, type));
    }

    // function of send action for remove cart item
    const deleteCartItem = (id) => {
        dispatch(removeCartItem(id));
    }

    return (
        <div className='cart-list'>
            <Label type={labelTypes.cartListHeader} text={titles.cartTitle} /> 
            <div className='list-wrapper'>
                {products ?
                    products.length > 0 ?
                    products.map((product, i) => (
                        <CartItemCard 
                            product={product} 
                            updateItmQty={(product, type) => updateItmQty(product, type)}
                            removeCartItem={deleteCartItem}
                        /> 
                        ))
                        : <Alert title={listEmptyMessage} />
                    : null
                }
            </div>
        </div>
    )
}

export default CartList;