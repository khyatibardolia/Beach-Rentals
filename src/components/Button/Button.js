import React from 'react';
import './style.css';

const Button = ({
                  title, background, onClick, isHomePage, icon, customClass, width,
                  loader, loaderView, type, disabled
                }) => {
  return <button onClick={!disabled ? onClick : undefined}
                 type={type ? type : 'button'}
                 disabled={disabled}
                 className={`btn ${isHomePage ? 'home-btn' : 'btn-orange'} 
                   ${width ? width : ''} ${customClass ? customClass : ''}`}
                 style={{background: background === undefined ? '' : background}}>
    {icon ? icon() : null}{title} {loader ? loaderView : null}
  </button>;
};

export default Button;
