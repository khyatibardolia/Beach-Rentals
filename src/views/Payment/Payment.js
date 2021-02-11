import { Elements } from '@stripe/react-stripe-js/dist/react-stripe';
import moment from 'moment';
import objectPath from 'object-path';
import React, { Component, lazy, Suspense } from 'react';
import { Card, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/img/logo.png';
import PaymentBannerImg from '../../assets/img/payment-banner.png';
import { Navigation } from '../../components/common/Navigation/Navigation';
import Subsection from '../../components/common/Subsection/Subsection';
import * as routes from '../../components/constants/routes';
import TermsOfService from '../../components/TermsOfService/TermsOfService';
import { stripePromise } from '../../config/stripe-config';
import { ProductDetails } from '../../redux/actions/create-booking';
import { GetReservationDetails } from '../../redux/actions/helpers';
import { SELECTED_PRODUCT_DETAILS } from '../../redux/constants';
import BookingTable from '../Booking/BookingTable';
import { InjectedCheckoutForm } from './InjectedCheckoutForm';
import './Payment.css';

const WaterRentalPolicy = lazy(() => import ('../Common/WaterRentalPolicy'));
let myVar;

class Payment extends Component {

  state = {isLoading: false};

  componentDidMount() {
    const {GetReservationDetails, history} = this.props;
    window.scrollTo(0, 0);

    const obj = {id: localStorage.getItem('id')};
    this.setState({isLoading: true});
    GetReservationDetails(obj).then((r) => {
      if (objectPath.get(r, 'type') === 'error') {
        toast.error(objectPath.get(r, 'response.message'));
        this.setState({isLoading: false});
        localStorage.removeItem('id');
        history.push('/');
      } else {
        this.setTimer();
        this.setState({isLoading: false});

      }
    });
  }

  componentWillUnmount() {
    const {history, ProductDetails} = this.props;
    ProductDetails(SELECTED_PRODUCT_DETAILS, []);
    clearInterval(myVar);
    history.push(routes.HOME);
  }

  setTimer = () => {
    const {history} = this.props;
    const todaysDate = moment().format('YYYY-MM-DD');
    const $time_limit = moment(`${todaysDate} 00:15:00`, 'YYYY-MM-DD HH:mm:ss').toDate();
    const d = new Date($time_limit);
    const minutes = d.getMinutes(); //15 minutes
    let seconds = 60 * minutes; // 600seconds

    if (typeof (localStorage) !== 'undefined' && localStorage.seconds) {
      seconds = localStorage.seconds;
    }

    function secondPassed() {
      const minutes = Math.round((seconds - 30) / 60);
      let remainingSeconds = seconds % 60;
      if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
      }
      if (typeof (localStorage) !== 'undefined') {
        localStorage.setItem('seconds', seconds);
      }
      const ele = document.getElementById('timer');
      if (ele) {
        ele.innerHTML = minutes + ':' + remainingSeconds;
      }
      if (seconds === 0) {
        clearInterval(myVar);
        if (ele) {
          ele.innerHTML = 'Time Out';
        }
        if (typeof (localStorage) !== 'undefined') {
          localStorage.removeItem('seconds');
        }
        localStorage.removeItem('id');
        toast.error('Your session has expired. Please try again!');
        history.push('/');
      } else {
        seconds--;
      }
    }

    myVar = setInterval(secondPassed, 1000);
  };

  render() {
    const {isLoading} = this.state;
    const {reservationData} = this.props;
    const finalAmount = parseFloat(objectPath.get(reservationData, 'total', 0)).toFixed(2);
    return <>
      <Subsection title={'Payment'} img={PaymentBannerImg}/>
      {isLoading ? <div className={'my-5 d-flex justify-content-center align-items-center'}>
          <div className="spinner-border text-blue"/>
        </div> :
        <div className="container my-3">
          <div className={'row'}>
            <div
              className={'col-sm-2 payment-title d-flex justify-content-start align-items-center'}>
              <h2 className={'text-blue'}>Payment</h2>
            </div>
            <div className={'col-sm-10 title-section d-flex justify-content-end' +
            ' align-items-center'}>
              <div className={'w-100'}>
                <p className={'f-16 mr-2 text-gray d-flex justify-content-end payment-subtitle'}>
                  Please complete the payment within 15 minutes to secure and complete this booking.
                </p>
              </div>
              <div className={'d-flex justify-content-end'}>
                <h1 id={'timer'}><span className="d-none"/></h1>
              </div>
            </div>
          </div>
          <div className={'row'}>
            <div className={'col-sm-12 col-lg-8 mb-3 w-100 h-100'}>
              <Card className={'w-100 h-100 payment-card'}>
                <Card.Header
                  className={'text-white payment-header bg-blue d-flex align-items-center'}>
                  <div className={'row w-100 h-100'}>
                    <div className={'col-md-4 col-sm-12 d-flex align-items-center' +
                    ' justify-content-center justify-content-sm-start'}>
                      <img src={logo} className="logo-image" alt="logo"/>
                    </div>
                    <div
                      className={'col-md-8 col-sm-12 font-bold-roman ' +
                      'd-flex align-items-center justify-content-center justify-content-sm-start' +
                      ' f-32 font-weight-bolder'}>
                      Booking Invoice
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className={'p-2 payment-body'}>
                  <div className="row mb-2">{/*TODO Invoice Number*/}
                    <div className={'col-sm-12 d-flex w-100 border-bottom'}>
                      <div className={'w-75'}>
                        <p className={'m-0 gray-text'}>17620 Termini San Luis Pass Rd.Galveston, TX
                          77554</p>
                      </div>
                      <div className={'w-25 d-flex justify-content-end'}>
                        <a href="tel:409-632-0256" className={'m-0 gray-text'}>
                          <i className="fa fa-phone mr-1" aria-hidden="true"/>
                          409-632-0256
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={'row'}>
                    <div className={'col-sm-6'}>
                      <div className={'text-left'}>
                        <div className={'d-flex'}><p className={'m-0 gray-text'}><span
                          className={'font-weight-bold'}>Name:</span> {objectPath.get(reservationData, 'name', '-')}
                        </p>
                        </div>
                        <div className={'d-flex'}><p className={'m-0 gray-text'}><span
                          className={'font-weight-bold'}>Address:</span> {`${reservationData.address},
                        ${reservationData.city}, ${reservationData.state}, ${reservationData.country}`}
                        </p></div>
                        <div className={'d-flex'}><p className={'m-0 gray-text'}><span
                          className={'font-weight-bold'}>Email :</span> {objectPath.get(reservationData, 'email', '-')}
                        </p>
                        </div>
                        <div className={'d-flex'}><p className={'m-0 gray-text'}><span
                          className={'font-weight-bold'}>Contact:</span> {objectPath.get(reservationData, 'mobile', '-')}
                        </p>
                        </div>
                      </div>
                    </div>
                    <div className={'col-sm-6 m-auto'}>
                      <div className={'w-100 d-flex border-blue'}>
                        <div className={'w-50 bg-blue p-2 text-center font-weight-bold'}>
                          <div>Booking Date</div>
                          <div>Total (USD)</div>
                        </div>
                        <div className={'w-50 p-2 text-center bg-white text-blue font-weight-bold'}>
                          <div>{moment(new Date()).format('MMM DD, YYYY')}</div>
                          <div>${finalAmount}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={'row mt-2'}>
                    <div className={'col-sm-12'}>
                      <Table responsive className="mb-0">
                        <thead className={'payment-header bg-blue'}>
                        <tr>
                          <th className={'text-white font-weight-bold'}
                              style={{minWidth: '300px'}}>Product
                          </th>
                          <th className={'text-white font-weight-bold'}
                              style={{minWidth: '156px'}}>Rate
                          </th>
                          <th className={'text-white' +
                          ' font-weight-bold'} style={{minWidth: '156px'}}>
                            Fuel charge</th>
                          <th className={'text-white font-weight-bold text-right'}>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <BookingTable data={reservationData.orders} colSpan={3}/>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className={'col-lg-4 col-sm-12'}>
              <Elements stripe={stripePromise}>
                <InjectedCheckoutForm finalAmount={finalAmount}/>
              </Elements>
            </div>
            <TermsOfService/>
            <Suspense fallback={<div className="spinner-border text-blue"/>}>
              <WaterRentalPolicy/>
            </Suspense>
          </div>
        </div>
      }
    </>;
  }
}

const mapStateToProps = state => {
  return {
    reservationData: objectPath.get(state, 'AppReducer.reservation_details')
  };
};
export default withRouter(connect(mapStateToProps, {GetReservationDetails, ProductDetails})
(Navigation(Payment)));

