import './styles/card.scss';
import { useState } from 'react';
import Label from '../../atoms/label/Label';
import QtyToggler from '../../atoms/qtyToggler/QtyToggler';
import IconButton from '@mui/material/IconButton';
import CartIcon from '@mui/icons-material/AddShoppingCart';
import { labelTypes } from '../../../constants';

function Card({key, product, addToCart}) {
    const [quantity, setQuantity] = useState(1); // Initial quantity value

    // Function to increment quantity
    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    // Function to decrement quantity
    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    // add item to shopping cart
    const addToCartList = () => {
        addToCart(product, quantity);
    }

    return (
        <div key={key} className="card">
            <div className='card-header'>
                <Label type={labelTypes.cardHeader} text={product.title}/>
            </div>
            <div className='card-image-container'>
                <img src={product.image} className='card-image' />
                <div className="cart-icon-wrapper">
                    <IconButton className='icon-btn' onClick={addToCartList}>
                        <CartIcon />
                    </IconButton>
                </div>
            </div>
       
            <div className='card-content'>
                <div className='description'>
                    <Label type={labelTypes.productDesc} text={product.description}/>
                </div>
                <div className='category'>
                    <Label type={labelTypes.productCategory} text={product.category}/>
                </div>
                <div className='cart-action'>
                    <div className='price'>
                        <Label type={labelTypes.productPrice} text={product.price}/>
                    </div>
                    <div className='qty-toggle-wrapper'>
                        <QtyToggler quantity={quantity} handleIncrease={handleIncrease} handleDecrease={handleDecrease}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;