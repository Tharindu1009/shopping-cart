import './styles/checkoutPanel.scss';
import { Button } from "@mui/material";
import Label from '../../components/atoms/label/Label';
import { labelTypes } from '../../constants';

function CheckoutPanel({label, amount}) {
    
    return (
        <div className='checkout-panel'>
            <div className='checkout-panel-content'>
                <Label type={labelTypes.cartTotal} text={label}/>
                <Label type={labelTypes.cartTotalPrice} text={amount.toFixed(2)}/>
            </div>
            <div >
                <Button className='checkout-btn' variant="contained">
                    Proceed to checkout
                </Button>
            </div>
        </div >
    )
}

export default CheckoutPanel;