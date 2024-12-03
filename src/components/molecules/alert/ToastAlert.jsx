import * as React from 'react';
import MuiAlert from '@mui/material/Alert';

const ToastAlert = React.forwardRef(function ToastAlert(props, ref) {
    return <MuiAlert elevation={3} variant="filled" ref={ref} {...props} />;
});

export default ToastAlert;