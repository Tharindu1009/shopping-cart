import './styles/registration.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { register,clearErrorMessage } from "../redux/features/user";
import Header from '../components/organisms/header/Header';
import InfoCard from '../components/molecules/card/InfoCard';
import Label from '../components/atoms/label/Label';
import Link from '../components/atoms/link/Link';
import RegForm from '../components/molecules/form/regForm/RegForm';
import banner from '../assets/images/login-banner.png';
import marker from '../assets/images/map.png';
import notify from '../assets/images/notify.png';
import { infoCardLabels, labelTypes, linkLabels } from '../constants';

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []); 

  const [state, setState] = useState({
    formTitle: "Register on QuickCart",
    formDesc: "Please enter your Name, Email and Password to Register on QuickCart",
  });

  // submit registration form
  const onSubmit = (data) => {
    dispatch(register(data));
  }

  const goToLogin = () => {
    // redirect to the register page
    navigate("/login");
}

  return (
    <div className="register">
        {/* start of reg page header */}
        <Header/> 
        {/* end of reg page header */}

        {/* start of reg form */}
        <div className='reg-container'>
            <div className='reg-wrapper'>
              <img className='banner-img' src={banner} alt="Banner" />
              <div className='info-card-wrapper'>
                  <InfoCard imgUrl={marker} title={infoCardLabels.orderInfo.title} 
                    description={infoCardLabels.orderInfo.description} />
                  <InfoCard imgUrl={notify} title={infoCardLabels.offerInfo.title} 
                    description={infoCardLabels.offerInfo.description} />
              </div>
              <div className='reg-form-wrapper'>
                  <Label type={labelTypes.loginFormTitle} text={state.formTitle} />
                  <Label type={labelTypes.loginFormDesc} text={state.formDesc} /> 

                  <RegForm onSubmit={onSubmit}/>

                  <div className='link-wrapper'>
                      <Link labelType={labelTypes.siteLink} labelText={linkLabels.login} onClick={goToLogin} />
                  </div>   
              </div>
            </div>
        </div>
        {/* end of login form */} 
    </div>
  );
}

export default Registration;