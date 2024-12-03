import './styles/qtyToggler.scss';
import { Button, ButtonGroup, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function QtyToggler({quantity, handleIncrease, handleDecrease}) {

    return (
        <div className='qty-toggler'>
            <ButtonGroup>
                <Button
                    className='toggle-btn toggle-btn__decrease'
                    onClick={handleDecrease}
                    color="error"
                    disabled={quantity <= 1} // Disable button if quantity is 1
                >
                    <RemoveIcon />
                </Button>
                <Button className='toggle-btn' disabled>
                    <Typography>{quantity}</Typography>
                </Button>
                <Button 
                    className='toggle-btn toggle-btn__increase' 
                    onClick={handleIncrease} 
                >
                    <AddIcon />
                </Button>
            </ButtonGroup>            
        </div>
    )
}

export default QtyToggler;