import './styles/footer.scss';
import { Typography } from '@mui/material';

function Footer() {
    return (
        <div className='footer'>
            <Typography variant="caption" display="block" className='copyright-text '>
                Copyright ©2024
            </Typography>
        </div>
    )
}

export default Footer;