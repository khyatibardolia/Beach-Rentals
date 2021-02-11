import React from 'react';
import { withRouter } from 'react-router-dom';
import pageNotFound from '../../../assets/img/page-not-found.png';
import './page-not-found.scss';
import * as routes from "../../constants/routes";

const PageNotFound = ({history}) => {
  return <div className='page-not-found d-flex align-items-center justify-content-center
    flex-column px-4 text-center vh-100'>
    <img src={pageNotFound} alt="pageNotFound" className="img-fluid" width={400}/>
    <h1 className="my-2">404 - Page Not Found!</h1>
    <p className="text-center mb-1">
      The page you are looking for might have been removed,
      had it's name changed, or is temporarily unavailable.
    </p>
    <button className="btn btn-back" onClick={() => history.push(routes.HOME)}>Back To Home</button>
  </div>;
};

export default withRouter(PageNotFound);
