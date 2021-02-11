import moment from 'moment';
import objectPath from 'object-path';
import React, { Component, lazy, Suspense } from 'react';
import { Card } from 'react-bootstrap';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import Image1 from '../../assets/img/beach-cart/cart-img1.png';
import Image2 from '../../assets/img/beach-cart/cart-img2.png';
import Reserveimg from '../../assets/img/reserve-img.png';
import Button from '../../components/Button/Button';
import DropDown from '../../components/common/Fields/Dropdown/DropDown';
import PickDate from '../../components/common/Fields/PickDate/PickDate';
import Slider from '../../components/common/Fields/Slider/Slider';
import { Navigation } from '../../components/common/Navigation/Navigation';
import Subsection from '../../components/common/Subsection/Subsection';
import { deliveryTimeArray, pickUpTimeArray } from '../../components/common/timeArray';
import * as routes from '../../components/constants/routes';
import { ProductDetails, SetBookingDates } from '../../redux/actions/create-booking';
import { CheckProductAvailability, GetProductDetails } from '../../redux/actions/helpers';
import { SELECTED_PRODUCT_DETAILS, SET_BOOKING_DATES } from '../../redux/constants';
import './Reserve.css';

const WaterRentalPolicy = lazy(() => import ('../Common/WaterRentalPolicy'));

class Reserve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reserveDateObj: {},
      cartArr: [
        {
          noPadding: true,
          images: [{
            img: Image1,
            colWidth: '12',
            showOverlay: false
          }]
        }, {
          noPadding: true,
          images: [{
            img: Image2,
            colWidth: '12',
            showOverlay: false
          }]
        }, {
          noPadding: true,
          images: [{
            img: Image1,
            colWidth: '12',
            showOverlay: false
          }]
        }],
      index: 0,
      isLoading: false,
      productDetails: [],
      imageArr: [],
      data: [],
      show: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    /*window.onload = (e) => {
      if(e) {
        this.setState({show: true});
      }
    };*/
    const {GetProductDetails, match, selectedBookingDates: reserveDateObj, change, history} = this.props;
    const type = objectPath.get(match, 'params.type', '');
    const id = objectPath.get(match, 'params.productId', '');
    if (id && type) {
      this.setState({isLoading: true});
      GetProductDetails({id, type}).then((response) => {
        if (objectPath.get(response, 'type') === 'error') {
          this.setState({productDetails: {}, isLoading: false, imageArr: []});
          toast.error(objectPath.get(response, 'response.message'));
        } else {
          const imageArr = [];
          const productImages = objectPath.get(response, 'data.product_image', []);

          if (productImages && productImages.length) {
            return productImages.forEach(d => {
              imageArr.push({
                noPadding: true,
                images: [{
                  img: d.image,
                  colWidth: '12',
                  showOverlay: false
                }]
              });
              this.setState({
                productDetails: objectPath.get(response, 'data'),
                isLoading: false,
                imageArr
              });
            });
          } else {
            this.setState({
              productDetails: objectPath.get(response, 'data'),
              isLoading: false,
              imageArr
            });
          }
        }
      });

      if (reserveDateObj && Object.keys(reserveDateObj).length) {
        change('checkin', moment(reserveDateObj.checkin).format('YYYY-MM-DD'));
        change('checkout', moment(reserveDateObj.checkout).format('YYYY-MM-DD'));
      } else {
        change('checkin', moment().add(1, 'day').format('YYYY-MM-DD'));
        change('checkout', moment().add(2, 'day').format('YYYY-MM-DD'));
      }
    } else {
      history.push(routes.HOME);
    }
  }

  handleSubmit = (obj) => {
    const {
      history, ProductDetails, bookingProductData, match, CheckProductAvailability,
      singleProductDetails, selectedBookingDates
    } = this.props;
    const {productDetails} = this.state;
    let qtyArr = [];
    const deliveryTime = selectedBookingDates.deliveryTime ? selectedBookingDates.deliveryTime :
      obj.deliveryTime ? obj.deliveryTime : '9:00:00';
    const pickupTime = selectedBookingDates.pickupTime ? selectedBookingDates.pickupTime :
      obj.pickupTime ? obj.pickupTime : '9:00:00';
    const checkInDate = obj.checkin + ' ' + deliveryTime;
    const checkOutDate = obj.checkout + ' ' + pickupTime;
    const data = {
      product_id: objectPath.get(match, 'params.productId', ''),
      product_type: objectPath.get(match, 'params.type', ''),
      check_in: moment(checkInDate).format('YYYY-MM-DD') + ' ' +
        deliveryTime,
      check_out: moment(checkOutDate).format('YYYY-MM-DD') + ' ' +
        pickupTime
    };
    this.setState({checkAvailability: true});
    CheckProductAvailability(data).then(r => {
      this.setState({checkAvailability: false});
      if (objectPath.get(r, 'response.code') === 400) {
        toast.error(objectPath.get(r, 'response.message'));
      } else if (objectPath.get(r, 'type') === 'error') {
        toast.error(objectPath.get(r, 'response.message', ''));
      } else if (objectPath.get(r, 'meta.code') && objectPath.get(r, 'meta.code') === 0) {
        toast.error(objectPath.get(r, 'meta.message', ''));
      } else {
        let selectedStartDate = moment(checkInDate).format('YYYY-MM-DD HH:mm:ss');
        //selectedStartDate = moment(selectedStartDate);
        let selectedEndDate = moment(checkOutDate).format('YYYY-MM-DD HH:mm:ss');
        //selectedEndDate = moment(selectedEndDate);
        productDetails.selectedStartDate = moment(selectedStartDate).format('YYYY-MM-DD HH:mm:ss');
        productDetails.selectedEndDate = moment(selectedEndDate).format('YYYY-MM-DD HH:mm:ss');
        productDetails.totalNights = moment(selectedEndDate).diff(moment(selectedStartDate), 'days');
        productDetails.type = objectPath.get(match, 'params.type', '');
        if (productDetails.type === '2') {
          productDetails.itemQty = '1';
        }
        for (let i = 1; i <= singleProductDetails.qty; i++) {
          qtyArr.push(i);
          productDetails.qtyArr = qtyArr;
        }
        let data = bookingProductData.slice();
        if (bookingProductData && bookingProductData.length) {
          /*let idx = data.findIndex(d => (d.id === productDetails.id));
          data[idx] = productDetails;*/
          if (bookingProductData.every(d =>
            (((d.id === productDetails.id || d.id !== productDetails.id) && d.type !== productDetails.type) ||
              ((d.id === productDetails.id || d.id !== productDetails.id) && d.type === productDetails.type
                && (d.selectedStartDate !== productDetails.selectedStartDate))))) {
            data.push(productDetails);
          } else if (bookingProductData.every(d =>
            ((d.id !== productDetails.id) && (d.type !== productDetails.type || d.type === productDetails.type)))) {
            data.push(productDetails);
          } else if (bookingProductData.some(d =>
            ((d.id === productDetails.id || d.id !== productDetails.id) && d.type === productDetails.type &&
              (d.selectedStartDate !== productDetails.selectedStartDate ||
                d.selectedStartDate === productDetails.selectedStartDate)))) {
            data.push(productDetails);
          }
        } else {
          data.push(productDetails);
        }
        ProductDetails(SELECTED_PRODUCT_DETAILS, data);
        history.push('/booking');
      }
    });
  };

  componentWillUnmount() {
    const {SetBookingDates} = this.props;
    SetBookingDates(SET_BOOKING_DATES, {
      checkin: moment().add(1, 'day').format('YYYY-MM-DD'),
      checkout: moment().add(2, 'day').format('YYYY-MM-DD')
    });
  }

  onChangeDate = (d) => {
    const {change, checkin} = this.props;
    if (checkin) {
      change('checkout', moment(new Date(d)).add(1, 'day').format('YYYY-MM-DD'));
    }
  };

  onChangeCheckoutDate = (d) => {
    const {change} = this.props;
    change('checkout', moment(d).add(1, 'day').format('YYYY-MM-DD'));
  };

  render() {
    const {isLoading, productDetails, imageArr, checkAvailability} = this.state;
    const {handleSubmit, checkin, checkout, selectedBookingDates} = this.props;

    return <>
      <Subsection title={productDetails ? productDetails.product_name : 'Product'}
                  img={Reserveimg}/>
      <div className="container my-3">
        <div
          className={`row ${isLoading ? 'w-100 h-100 d-flex justify-content-center align-items-center' : ''}`}>
          {isLoading ? <div className="spinner-border text-blue"/> : <>
            <div className={'col-sm-12 col-md-6 col-lg-6 m-0 py-2'}>
              <Slider data={imageArr} id={'reserve-slider'}
                      isReservePage={true}
                      indicators={true}
                      controls={true}/>
            </div>
            <div className={'col-sm-12 col-md-6 col-lg-6 m-0 py-2'}>
              <Card className={'reserve-card w-100 h-100'}>
                <Card.Header
                  className={'reserve-card-header text-white'}>{productDetails?.product_name}</Card.Header>
                <Card.Body
                  className="p-2 d-flex flex-column justify-content-between h-100">
                  <div className="overflow-auto h-50">
                    <Card.Text className={'m-0 reserve-card-description'}>
                      {productDetails?.description}
                    </Card.Text>
                  </div>
                  <form onSubmit={handleSubmit(this.handleSubmit)}
                        className="w-100 d-flex flex-column justify-content-center align-items-center">
                    <div className={'row w-100'}>
                      <div className={'col-sm-6'}>
                        <div className="date-view h-60 d-flex date-picer-view">
                          <Field component={PickDate}
                                 name={'checkin'}
                                 onChangeDate={this.onChangeDate}
                                 isSetMinDate={true}
                                 showLabel={false}
                                 minDate={selectedBookingDates.checkin ?
                                   moment(selectedBookingDates.checkin).format('YYYY-MM-DD') :
                                   moment(new Date()).add(1, 'day').format('YYYY-MM-DD')}/>
                        </div>
                      </div>
                      <div className={'col-sm-6'}>
                        <div className="date-view height-60">
                          <Field component={DropDown}
                                 name={'deliveryTime'}
                                 optionList={deliveryTimeArray}
                                 icon={'fa-clock-o'}
                                 customClass={'align-drpdwn'}
                                 selectedValue={selectedBookingDates.deliveryTime ? selectedBookingDates.deliveryTime : '9:00:00'}
                                 label="Delivery Time"/>
                        </div>
                      </div>
                    </div>
                    <div className={'row w-100'}>
                      <div className={'col-sm-6'}>
                        <div className='date-view date-picer-view h-60 d-flex'>
                          <Field component={PickDate}
                                 name={'checkout'}
                                 onChangeDate={this.onChangeCheckoutDate}
                                 isSetMinDate={true}
                                 showLabel={false}
                                 selected={checkout && moment(checkout, 'YYYY-MM-DD')}
                                 minDate={selectedBookingDates.checkin ?
                                   moment(selectedBookingDates.checkin).add(1, 'day').format('YYYY-MM-DD') :
                                   moment(checkin).add(1, 'day').format('YYYY-MM-DD')}/>
                        </div>
                      </div>
                      <div className={'col-sm-6'}>
                        <div className="date-view height-60">
                          <Field component={DropDown}
                                 name={'pickupTime'}
                                 customClass={'align-drpdwn'}
                                 optionList={pickUpTimeArray}
                                 icon={'fa-clock-o'}
                                 selectedValue={selectedBookingDates.pickupTime ? selectedBookingDates.pickupTime : '9:00:00'}
                                 label="Pick Up Time"/>
                        </div>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className={'col-sm-12 d-flex justify-content-center'}>
                        <Button title="Book Now"
                                type="submit"
                                loader={checkAvailability}
                                disabled={checkAvailability}
                                loaderView={<div
                                  className="spinner-border spinner-border-sm ml-2"/>}
                                customClass={`mb-0 mt-2  btn-checkout ${checkAvailability ? 'px-2' : ''}`}/>
                      </div>
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </div>
          </>}
        </div>
        {!isLoading && <div className={'row mt-4'}>
          <Suspense fallback={<div className="spinner-border text-blue"/>}>
            <WaterRentalPolicy/>
          </Suspense>
        </div>}
      </div>
    </>;
  }
}

const selector = formValueSelector('ReservePage');
const mapStateToProps = (state) => {
  const singleProductDetails = objectPath.get(state, 'AppReducer.productDetails');
  const bookingProductData = objectPath.get(state, 'CreateBooking.productData');
  const selectedBookingDates = objectPath.get(state, 'CreateBooking.selectedBookingDates');
  return {
    selectedBookingDates,
    singleProductDetails,
    bookingProductData,
    checkin: selector(state, 'checkin'),
    checkout: selector(state, 'checkout')
  };
};

export default withRouter(connect(mapStateToProps, {
  SetBookingDates,
  GetProductDetails,
  CheckProductAvailability,
  ProductDetails
})(reduxForm({
  form: 'ReservePage',
  enableReinitialize: true,
  destroyOnUnmount: false
})(Navigation(Reserve))));
