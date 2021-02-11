import React from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../../constants/routes';
import './Subsection.css';

const Subsection = ({title, img}) => {
  return <section className="page-banner" style={{backgroundImage: `url(${img})`}}>
    <div id="color-overlay"/>
    <div className="container position-relative text-white py-5">
      <div className="banner-content text-left py-lg-2">
        <div className="banner-text text-sm-left text-center">
          <NavLink exact to={routes.HOME}>
            <span className="tab-text text-white">{'Home / '}</span>
          </NavLink>
          <span className="page-title">{title}</span>
        </div>
      </div>
    </div>
  </section>;
};

export default Subsection;
