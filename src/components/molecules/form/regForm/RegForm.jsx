import './styles/regForm.scss';
import { useSelector } from "react-redux";
import { TextField, Button, Alert } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Email from '@mui/icons-material/Email';
import Lock from '@mui/icons-material/Lock';
import { useFormik } from 'formik';
import * as yup from 'yup';

function RegForm({onSubmit}) {
    
    // get data from redux store
    const errorMessage = useSelector((state) => state.user.errorMessage);
    const successMessage = useSelector((state) => state.user.successMessage);
    const loading = useSelector((state) => state.user.loading);

    // YUP validation schema 
    const validationSchema = yup.object({
        name: yup
          .string('Enter your name')
          .required('Name is required'),
        email: yup
          .string('Enter your email')
          .email('Enter a valid email')
          .required('Email is required'),
        password: yup
          .string('Enter your password')
          .min(8, 'Password should be of minimum 8 characters length')
          .required('Password is required'),
      });
    
      // formik hook initialization
      const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          const data = {
            name: values.name,
            email: values.email,
            password: values.password,
          }
      
          onSubmit(data);
        },
      });

    return (
        <div className='reg-form'>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    className='input-field'
                    id="name"
                    name="name"
                    label="Name"
                    placeholder='name'
                    size="small"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}        
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      },
                    }}       
                />
                <TextField
                    fullWidth
                    className='input-field'
                    id="email"
                    name="email"
                    label="Email"
                    placeholder='email'
                    size="small"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      },
                    }}        
                />
                <TextField
                    fullWidth
                    className='input-field'
                    id="outlined-adornment-password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder='password'
                    size="small"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),
                      },
                    }}        
                />
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                          
                <Button type='submit' loading={loading} className='btn-submit' variant="contained">
                    Register
                </Button>        
            </form>
        </div>
    );
}

export default RegForm;