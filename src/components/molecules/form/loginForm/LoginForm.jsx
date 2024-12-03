import './styles/loginForm.scss';
import { useSelector } from "react-redux";
import { TextField, Button, Alert } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import { useFormik } from 'formik';
import * as yup from 'yup';

function LoginForm({onSubmit}) {

    // get data from redux store
    const errorMessage = useSelector((state) => state.user.errorMessage);
    const loading = useSelector((state) => state.user.loading);

    // YUP validation schema 
    const validationSchema = yup.object({
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
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {    
          const data = {
            email: values.email,
            password: values.password,
          }

          onSubmit(data)
        },
      });

    return (
        <div className='login-form'>
            <form onSubmit={formik.handleSubmit}>
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
                            <AccountCircle />
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
                <Button type='submit' loading={loading} className='btn-submit' variant="contained">
                    Login
                </Button>
            </form>       
        </div>
    );
}

export default LoginForm;