import moment from 'moment';
import objectPath from 'object-path';
import React, { Component, lazy, Suspense } from 'react';
import { Accordion, Card, Col, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import checkout from '../../assets/img/checkout.png';
import Button from '../../components/Button/Button';
import PickDate from '../../components/common/Fields/PickDate/PickDate';
import RenderCheckBoxField from '../../components/common/Fields/render-check-box-field';
import RenderCommonInputField from '../../components/common/Fields/render-comon-input-field';
import { Navigation } from '../../components/common/Navigation/Navigation';
import Subsection from '../../components/common/Subsection/Subsection';
import * as routes from '../../components/constants/routes';
import TermsOfService from '../../components/TermsOfService/TermsOfService';
import { CreateBooking, ProductDetails } from '../../redux/actions/create-booking';
import { CreateReservation, ResetReduxForm } from '../../redux/actions/helpers';
import { CREATE_BOOKING, SELECTED_PRODUCT_DETAILS } from '../../redux/constants';
import { calculateTotal } from '../Common/calculateTotal';
import './Booking.scss';
import BookingTable from './BookingTable';

const WaterRentalPolicy = lazy(() => import ('../Common/WaterRentalPolicy'));

class Booking extends Component {
  state = {isLoading: false};

  componentDidMount() {
    window.scrollTo(0, 0);
    const {change, dob} = this.props;
    if (dob) {
      change('dob', dob);
    }
  }

  removeItem = (id, name) => {
    const {productData: productDetails, ProductDetails} = this.props;
    const data = productDetails.filter(d => d.id !== id);
    ProductDetails(SELECTED_PRODUCT_DETAILS, data);
    toast.success(name + ' removed from cart.');
  };

  removeAllItems = () => {
    const {ProductDetails, ResetReduxForm} = this.props;
    ProductDetails(SELECTED_PRODUCT_DETAILS, []);
    if (typeof ResetReduxForm === 'function') {
      ResetReduxForm('BookingForm');
      toast.success('Products removed successfully.');
    }
  };

  componentWillUnmount() {
    const {ResetReduxForm} = this.props;
    //ProductDetails(SELECTED_PRODUCT_DETAILS, []);
    if (typeof ResetReduxForm === 'function') {
      ResetReduxForm('BookingForm');
    }
  }

  getIcon = () => {
    return <span className="cart-icon"/>;
  };
  redirectToPayments = () => {
    const {history, productData} = this.props;
    if (productData && productData.length) {
      if (typeof (localStorage) !== 'undefined' && localStorage.getItem('seconds')) {
        localStorage.removeItem('seconds');
      }
      history.push(routes.PAYMENT);
    } else {
      toast.error('Please select at least one product.');
    }
  };

  handleSubmit = (data) => {
    const {CreateReservation, CreateBooking, productData} = this.props;
    const obj = {...data};
    obj.dob = moment(obj.dob).format('YYYY-MM-DD');
    const arr = [];
    productData && productData.forEach((d) => {
      if (d.type === '1') {
        arr.push({
          'product_id': d.id,
          'product_type': d.type,
          'check_in': moment(d.selectedStartDate).format('YYYY-MM-DD HH:mm:ss'),
          'check_out': moment(d.selectedEndDate).format('YYYY-MM-DD HH:mm:ss'),
          'amount': calculateTotal(d).total,
          'fuel_id': d.fuel_id
        });
      } else {
        arr.push({
          'product_id': d.id,
          'product_type': d.type,
          'check_in': moment(d.selectedStartDate).format('YYYY-MM-DD HH:mm:ss'),
          'check_out': moment(d.selectedEndDate).format('YYYY-MM-DD HH:mm:ss'),
          'amount': calculateTotal(d, d.qty).total,
          'qty': d.itemQty
        });
      }
    });
    if (arr && arr.length) {
      obj.products = JSON.stringify(arr);
      obj.receive_offers = obj.chkOffers ? '1' : '0';
      this.setState({isLoading: true});
      const data = {...obj};
      data.email = data.bookingEmail;
      CreateBooking(CREATE_BOOKING, obj);
      CreateReservation(data).then(r => {
        if (objectPath.get(r, 'type') === 'error') {
          toast.error(objectPath.get(r, 'response.message'));
          this.setState({isLoading: false});
        } else {
          localStorage.setItem('id', r.data.id);
          this.setState({isLoading: false});
          this.redirectToPayments();
        }
      });
    } else {
      toast.error('Please add at least one product.');
    }
  };

  fnKeyPressNumber = (e) => {
    if ((e.charCode !== 46 || e.target.value.includes('.')) && e.charCode !== 44 &&
      !(e.charCode >= 48 && e.charCode <= 57)) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  toggle = () => {
    this.setState(state => {
      state.toggleAddress = !state.toggleAddress;
      return state;
    });
  };

  render() {
    const {toggleAddress, isLoading} = this.state;
    const {handleSubmit, productData, history, dob} = this.props;
    return <>
      <Subsection title={'Checkout'} img={checkout}/>
      <div className="container my-3 booking-page">
        <Row className="d-flex align-items-center justify-content-between
        booking-page-header mb-2">
          <Col sm={12} md={6}
               className={'payment-title d-flex align-items-center'}>
            <span className="page-title">Create Booking</span>
          </Col>
        </Row>
        <span className="desc-text">
          Please complete the payment to secure and complete this booking. To reserve your luxury golf cart in advance — and you really should, as availability is limited during busy seasons and events — use the interactive reservation tool below.
        </span>
        <div className='mt-4 table-bg px-3 pt-3'>
          <div className={'mb-2'}>
            <button className={'mr-2 p-1 text-blue bg-white btn-booking f-w-500 rounded'}
                    onClick={() => {
                      history.push('/');
                    }}>
              <i className={'fa fa-plus mr-1'}/>Add Booking
            </button>
            {productData && productData.length ?
              <button className={'mr-2 p-1 text-danger bg-white btn-booking f-w-500 rounded'}
                      onClick={this.removeAllItems}>
                <i className={'fa fa-minus-circle mr-1'}/>Clear All
              </button> : null}
          </div>
          <Table responsive className="mb-0">
            <thead className={'payment-header bg-blue'}>
            <tr>
              <th className={'text-white font-weight-bold'} style={{minWidth: '300px'}}>Product</th>
              <th className={'text-white font-weight-bold'} style={{minWidth: '300px'}}>Rate</th>
              <th className={'text-white' +
              ' font-weight-bold'} style={{minWidth: '300px'}}>
                Fuel charge</th>
              <th className={'text-white font-weight-bold text-right'}>Amount</th>
            </tr>
            </thead>
            <tbody>
            <BookingTable data={productData} removeItem={this.removeItem} colSpan={3}/>
            </tbody>
          </Table>
        </div>
        <form onSubmit={handleSubmit(this.handleSubmit)} className="form-layout my-3">
          <Row>
            <Col sm={12} md={6} className="custom-input-div">
              <Field type="text"
                     placeholder="Name"
                     name="name"
                     component={RenderCommonInputField}/>
            </Col>
            <Col sm={12} md={6} className="custom-input-div">
              <Field type="email"
                     placeholder="E-mail"
                     name="bookingEmail"
                     component={RenderCommonInputField}/>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6} className="custom-input-div">
              <Field type="text"
                     maxLength={10}
                     onKeyPress={this.fnKeyPressNumber}
                     placeholder="Phone"
                     name="mobile"
                     component={RenderCommonInputField}/>
            </Col>
            <Col sm={12} md={6} className="custom-input-div">
              <Field component={PickDate}
                     name={'dob'}
                     setMinDate={false}
                     isBookingPage={true}
                     hideIcon={true}
                     customLabelClass={'o-50 booking-from-input-text-color'}
                     isDob={true}
                     label={'Date of birth'}
                     showLabel={!dob}
                     selected={dob ? dob : moment()}
                     maxDate={moment()}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion defaultActiveKey="0"
                         className={` w-100 h-100 d-flex justify-content-center align-items-center`}>
                <Card className={`w-100 my-2 cursor-pointer`}>
                  <Accordion.Toggle as={Card.Header} eventKey={'0'}
                                    onClick={this.toggle} className="py-1 pl-2">
                    <strong>
                      <span>Delivery Address</span>
                      <span className={'arrows'}>
                            <i aria-hidden="true"
                               className={`fa fa-angle-${!toggleAddress ? 'up' : 'down'}`}/>
                        </span>
                    </strong>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={'0'}>
                    <Card.Body>
                      <Row>
                        <Col sm={12} className="custom-input-div">
                          <Field type="text"
                                 placeholder="Address"
                                 name="address"
                                 className="form-control"
                                 component={RenderCommonInputField}/>
                        </Col>
                        <Col sm={12} md={6} className="custom-input-div">
                          <Field type="text"
                                 placeholder="City"
                                 name="city"
                                 className="form-control"
                                 component={RenderCommonInputField}/>
                        </Col>
                        <Col sm={12} md={6} className="custom-input-div">
                          <Field type="text"
                                 placeholder="State"
                                 name="state"
                                 className="form-control"
                                 component={RenderCommonInputField}/>
                        </Col>
                        <Col sm={12} md={6} className="custom-input-div">
                          <Field type="text"
                                 placeholder="Country"
                                 name="country"
                                 className="form-control"
                                 component={RenderCommonInputField}/>
                        </Col>
                        <Col sm={12} md={6} className="custom-input-div">
                          <Field type="text"
                                 placeholder="Postal Code"
                                 onKeyPress={this.fnKeyPressNumber}
                                 name="zip_code"
                                 maxLength={5}
                                 className="form-control"
                                 component={RenderCommonInputField}/>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>

          </Row>
          <Row>
            <Col sm={12} className="custom-input-div">
              <Field type="text"
                     placeholder="Driver license number"
                     name="licence_number"
                     className="form-control"
                     component={RenderCommonInputField}/>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              <Field type="text"
                     placeholder="Enter any special request"
                     name="special_request"
                     rows="3"
                     className="form-control"
                     component="textarea"/>
            </Col>
            <Col sm={12} className="form-check custom-checkbox">
              <Field label="Receive special offers and updates!"
                     name="chkOffers"
                     defaultChecked={true}
                     component={RenderCheckBoxField}/>
            </Col>
          </Row>
          <Row>
            <TermsOfService class={'px-2'}/>
          </Row>
          <Row className={'my-2'}>
            <Col sm={12}
                 className="custom-input-div form-check custom-checkbox">
              <Field label="I have read and agreed to the Terms of Service."
                     name="chkCondition"
                     component={RenderCheckBoxField}/>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}
                 className="custom-input-div form-check custom-checkbox">
              <Button type="submit" title="Proceed to Checkout"
                      customClass="my-1 w-52 btn-checkout d-flex align-items-center justify-content-center"
                      icon={this.getIcon}
                      loader={isLoading}
                      disabled={isLoading}
                      loaderView={<div className="spinner-border spinner-border-sm ml-2"/>}/>
            </Col>
          </Row>
        </form>
        <Row>
          <Suspense fallback={<div className="spinner-border text-blue"/>}>
            <WaterRentalPolicy/>
          </Suspense>
        </Row>
      </div>
    </>;
  }
}

const isOverEighteen = (date) => {
  const eighteenYearsAgo = moment().subtract(18, 'years');
  const birthday = moment(date);
  if (!eighteenYearsAgo.isAfter(birthday)) {
    return 'To make a booking you have to be at least 18 years old.';
  }
};

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required.';
  }
  if (!values.bookingEmail) {
    errors.bookingEmail = 'Email is required.';
  }
  if (values.bookingEmail && !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.bookingEmail))) {
    errors.bookingEmail = 'Please enter valid email.';
  }
  if (!values.mobile) {
    errors.mobile = 'Phone is required.';
  }
  if (values.mobile && values.mobile.length < 10) {
    errors.mobile = 'Phone must be of 10 digits.';
  }
  if (!values.dob) {
    errors.dob = 'Date of birth is required.';
  }
  if (values.dob) {
    errors.dob = isOverEighteen(values.dob);
  }
  if (!values.address) {
    errors.address = 'Address is required.';
  }
  if (!values.city) {
    errors.city = 'City is required.';
  }
  if (!values.state) {
    errors.state = 'State is required.';
  }
  if (!values.country) {
    errors.country = 'Country is required.';
  }
  if (!values.zip_code) {
    errors.zip_code = 'Postal code is required.';
  }
  if (!values.licence_number) {
    errors.licence_number = 'Driver licence number is required.';
  }
  if (!values.chkCondition) {
    errors.chkCondition = 'Please agree with terms of service.';
  }
  return errors;
};

const selector = formValueSelector('BookingForm');
const mapStateToProps = state => {
  const bookingData = objectPath.get(state, 'CreateBooking.bookingData', {});
  return {
    bookingData,
    dob: selector(state, 'dob'),
    productData: objectPath.get(state, 'CreateBooking.productData', [])
  };
};
export default withRouter(connect(mapStateToProps, {
  CreateReservation, CreateBooking,
  ResetReduxForm, ProductDetails
})(reduxForm({
  form: 'BookingForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  validate
})(Navigation(Booking))));
