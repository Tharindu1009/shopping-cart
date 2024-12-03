import './styles/cartItemCard.scss';
import { useState } from 'react';
import Label from '../../atoms/label/Label';
import QtyToggler from '../../atoms/qtyToggler/QtyToggler';
import VerticalSeperator from '../../atoms/seperator/VerticalSeperator';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { labelTypes, qtyUpdateTypes } from '../../../constants';

function CartItemCard({product, updateItmQty, removeCartItem}) {

    const [quantity, setQuantity] = useState(product.qty);

    // Function to increment quantity
    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
        updateItmQty(product, qtyUpdateTypes.increase);
    };

    // Function to decrement quantity
    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
        if (quantity > 1) {
            updateItmQty(product, qtyUpdateTypes.decrease);
        }
    };

    return (
        <div className='cart-item-card'>
            <Grid container spacing={2}>
                <Grid item xs={5} md={2} lg={2}>
                    <div className='card-image-wrapper'>
                        <img src={product.image} className='card-image' />
                    </div>
                </Grid>
                <Grid item xs={7} md={7} lg={7}>
                    <div className='cart-item-body'>
                        <Label type={labelTypes.cartItemTitle} text={product.title}/>
                        <Label type={labelTypes.cartItemPrice} text={product.price}/>
                        
                        <div className='cart-item-action'>
                            <QtyToggler quantity={product.qty} handleIncrease={handleIncrease} handleDecrease={handleDecrease}/>
                            <div className='cart-item-action-seperator'>
                                <VerticalSeperator color="black"/>
                            </div>
                            <IconButton className='remove-btn'size='small' onClick={() => removeCartItem(product.id)}>
                                <DeleteIcon className='icon'/>
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <div className='cart-item-subtotal'>
                        <Label type={labelTypes.cartItemSubTotal} text="Sub Total : "/>
                        <Label type={labelTypes.cartItemSubTotalPrice} text={product.subTotal.toFixed(2)}/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default CartItemCard;