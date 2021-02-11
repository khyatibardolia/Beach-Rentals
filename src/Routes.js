import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './components/common/PageNotFound/page-not-found';
import * as routes from './components/constants/routes';
import AboutUs from './views/AboutUs/AboutUs';
import Booking from './views/Booking/Booking';
import ContactUs from './views/ContactUs/ContactUs';
import Faq from './views/Faq/Faq';
import Home from './views/Home/Home';
import Payment from './views/Payment/Payment';
import PrivacyPolicy from './views/PrivacyPolicy/PrivacyPolicy';
import Reserve from './views/Reserve/Reserve';
import TermsAndConditions from './views/TermsAndConditions/TermsAndConditions';

const Routes = () => {
  return <Switch>
    <Route exact path={routes.HOME} component={Home}/>
    <Route exact path={routes.FAQ} component={Faq}/>
    <Route exact path={routes.RESERVE} component={Reserve}/>
    <Route exact path={routes.BOOKING} component={Booking}/>
    <Route exact path={routes.PAYMENT} component={Payment}/>
    <Route exact path={routes.CONTACTUS} component={ContactUs}/>
    <Route exact path={routes.PRIVACYPOLICY} component={PrivacyPolicy}/>
    <Route exact path={routes.ABOUTUS} component={AboutUs}/>
    <Route exact path={routes.TERMSANDCONDITIONS} component={TermsAndConditions}/>
    <Route component={PageNotFound}/>
  </Switch>;
};
export default withRouter(Routes);
