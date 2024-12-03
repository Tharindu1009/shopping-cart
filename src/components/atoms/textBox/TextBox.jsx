import './styles/textBox.scss';
import * as React from 'react';
import TextField from '@mui/material/TextField';

function TextBox({ id, size, value, placeholder, onChange }) {
    return (
        <div className='textBox'>
            <TextField
                className='textBox'
                fullWidth
                id={id}
                size={size}
                placeholder={placeholder}
                autoComplete="off"
                onChange={(e) => onChange(e)}
                value={value}
            />
        </div>
    );
}

export default TextBox;

