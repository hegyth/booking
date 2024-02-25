import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { loginUser } from '../../redux/actions/userActions';
import './AuthPage.css';

export default function AuthPage() {
  const [input, setInput] = useState({
    login: '',
    password: '',
  });

  const dispatch = useDispatch();

  const changeInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginHandler = () => {
    dispatch(loginUser(input));
  };

  const [verified, setVerified] = useState({ isVerified: false });
  const onChangeHandler = (value) => {
    console.log('Captcha value:', value);
    setVerified({ isVerified: true });
  };

  return (
    <>
      <div className="header">

        <div className="inner-header flex">
          {/*  */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
          >
            <div className="bodyForm">
              <div className="underForm">
                <div className="user">
                  <header className="user__header">
                    <h1 className="user__title">Авторизация</h1>
                  </header>
                  <form className="form">

                    <div className="form__group">
                      <input onChange={changeInput} name="login" type="email" placeholder="Login" className="form__input" />
                    </div>

                    <div className="form__group">
                      <input onChange={changeInput} name="password" type="password" placeholder="Password" className="form__input" />
                    </div>
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={onChangeHandler}
                      style={{ width: '100%' }}
                    />
                    <button id="button" className="buton" type="button" disabled={!verified.isVerified} onClick={loginHandler}>Войти</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>

      </div>
      {/*  */}
      {/*  */}
      {/*  */}
    </>
  );
}
