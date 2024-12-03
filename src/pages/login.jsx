import './styles/login.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { login,clearErrorMessage } from "../redux/features/user";
import Header from '../components/organisms/header/Header';
import InfoCard from '../components/molecules/card/InfoCard';
import Label from '../components/atoms/label/Label';
import Link from '../components/atoms/link/Link';
import LoginForm from '../components/molecules/form/loginForm/LoginForm';
import banner from '../assets/images/login-banner.png';
import marker from '../assets/images/map.png';
import notify from '../assets/images/notify.png';
import { infoCardLabels, labelTypes, linkLabels } from '../constants';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authorizedStatus = useSelector((state) => state.user.authorizedStatus);

  useEffect(() => {
    //set application to logout state before login
    localStorage.setItem('loggedIn', 0);
    dispatch(clearErrorMessage());
  }, []);

  useEffect(() => {
    // check user autharization status and redirect home page after successfull login
    if (authorizedStatus === true) {
      localStorage.setItem('loggedIn', 1);
      navigate('/home');
    }
  }, [authorizedStatus]);

  const [state, setState] = useState({
    formTitle: "Login on QuickCart",
    formDesc: "Please enter your Email and Password to Login on QuickCart",
  });

  // submit login form
  const onSubmit = (data) => {
    dispatch(login(data));
  }

  const goToRegister = () => {
      // redirect to the register page
      navigate("/registration");
  }

  return (
    <div className="login">
        {/* start of login page header */}
        <Header/> 
        {/* end of login page header */}

        {/* start of login form */}
        <div className='login-container'>
            <div className='login-wrapper'>
              <img className='banner-img' src={banner} alt="Banner" />
              <div className='info-card-wrapper'>
                  <InfoCard imgUrl={marker} title={infoCardLabels.orderInfo.title} 
                    description={infoCardLabels.orderInfo.description} />
                  <InfoCard imgUrl={notify} title={infoCardLabels.offerInfo.title} 
                    description={infoCardLabels.offerInfo.description} />
              </div>
              <div className='login-form-wrapper'>
                  <Label type={labelTypes.loginFormTitle} text={state.formTitle} />
                  <Label type={labelTypes.loginFormDesc} text={state.formDesc} /> 

                  <LoginForm onSubmit={onSubmit}/>

                  <div className='link-wrapper'>
                      <Link labelType={labelTypes.siteLink} labelText={linkLabels.register} onClick={goToRegister}/>
                  </div>
              </div>
            </div>
        </div>
        {/* end of login form */} 
    </div>

  );
}

export default Login;