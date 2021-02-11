import moment from 'moment';
import objectPath from 'object-path';
import React, { Component } from 'react';
import { Carousel, Col, Modal, Row } from 'react-bootstrap';
import Button from '../../../../components/Button/Button';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { SetBookingDates } from '../../../../redux/actions/create-booking';
import {
  checkGolfCartAvailabiity,
  ResetReduxForm
} from '../../../../redux/actions/helpers';
import { SET_BOOKING_DATES } from '../../../../redux/constants';
import { deliveryTimeArray, pickUpTimeArray } from '../../timeArray';
import DropDown from '../Dropdown/DropDown';
import PickDate from '../PickDate/PickDate';
import errorImage from './../../../../assets/img/no-image.svg';
import './Slider.scss';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      imageLoader: {},
      setImageSize: {
        width: props.isBeachView ? '350' : '540',
        height: props.isBeachView ? '485' : '340'
      },
      showModal: false,
      isLoading: false,
      fuelList: []
    };
  }

  showModal = (e, passenger, isGolfCart, path) => {
    e.preventDefault();
    e.stopPropagation();
    const {fuel} = this.props;
    const {fuelList} = this.state;
    if(fuelList && !fuelList.length) {
      fuel && fuel.length && fuel.forEach((d) => {
        const obj = {};
        obj.title = d.name;
        fuelList[0] = {title: 'Select fuel'};
        fuelList.push(obj);
        this.setState({fuelList: fuelList});
      });
    }
    const {history, isReservePage} = this.props;
    if (!isReservePage && !isGolfCart) {
      history.push(path ? path : '/');
    } else {
      this.setState({showModal: !isReservePage, noOfPassenger: passenger});
    }
  };

  hideModal = () => {
    const {ResetReduxForm} = this.props;
    this.setState({showModal: false});
    if (typeof ResetReduxForm === 'function') {
      ResetReduxForm('GolfCartAvailability');
    }
  };

  handleSubmit = () => {
    const {
      checkGolfCartAvailabiity, checkin, checkout, passenger, fuel, history, deliveryTime,
      pickupTime, fuelType, SetBookingDates
    } = this.props;
    const {noOfPassenger} = this.state;
    const selectedCart = passenger && passenger.length && passenger.find(d => noOfPassenger === d.name);
    const selectedFuel = fuel && fuel.length && fuel.find(d => fuelType === d.name);
    if (checkin && checkout && fuelType && deliveryTime && pickupTime) {
      const obj = {
        passenger_id: selectedCart.id,
        check_in: checkin + ' ' + deliveryTime,
        check_out: checkout + ' ' + pickupTime,
        fuel_id: selectedFuel.id
      };
      this.setState({isLoading: true});
      checkGolfCartAvailabiity(obj).then((res) => {
        if (objectPath.get(res, 'meta.code') && objectPath.get(res, 'meta.code') === 0) {
          toast.error(objectPath.get(res, 'meta.message', ''));
          this.setState({isLoading: false});
        } else if (objectPath.get(res, 'response.code') === 400) {
          toast.error(objectPath.get(res, 'response.message'));
          this.setState({isLoading: false});
        } else if (objectPath.get(res, 'type') === 'error') {
          toast.error(objectPath.get(res, 'response.message', ''));
          this.setState({isLoading: false});
        } else {
          SetBookingDates(SET_BOOKING_DATES, {
            checkin: checkin,
            checkout: checkout,
            deliveryTime: deliveryTime,
            pickupTime: pickupTime,
          });
          history.push(`/reserve/${objectPath.get(res, 'data.product_id')}/1`);
        }
      });
    } else {
      toast.error('Please select all details to proceed booking.');
    }
  };

  handleSelect = index => {
    this.setState({index});
  };

  setImageLoaded = (id, type) => {
    this.setState((state) => {
      state.imageLoader[id] = type;
      return state;
    });
  };

  onChangeCheckIn = (d) => {
    const {change} = this.props;
    change('checkout_date', moment(d).add(1, 'day').format('YYYY-MM-DD'));
  };

  onChangeCheckout = (d) => {
    const {change} = this.props;
    change('checkout_date', moment(d).add(1, 'day').format('YYYY-MM-DD'));
  };

  componentWillUnmount() {
    const {ResetReduxForm} = this.props;
    if (typeof ResetReduxForm === 'function') {
      ResetReduxForm('GolfCartAvailability');
    }
  }

  render() {
    const {index, setImageSize, showModal, isLoading, fuelList} = this.state;
    const {data, id, indicators, controls, isReservePage, isBeachView, checkin, checkout,
      isCartSlider} = this.props;
    return <>{<Carousel id={id}
                        className="slider"
                        data-ride="carousel"
                        defaultActiveIndex={index}
                        activeIndex={index}
                        indicators={indicators ? indicators : false}
                        controls={controls ? controls : false}
                        onSelect={this.handleSelect}
                        fade={true}>
      {data && data.length ? data.map((item, i) => {
          return <Carousel.Item key={i}>
            <Row>
              {item.images?.map((d, key) => {
                return <Col key={key}
                            className={`${item.noPadding ? '' : 'py-3'}
                                                   ${((key !== index) && !isReservePage) && !isCartSlider ?
                              'clearfix d-none d-sm-block' : ''}`}
                            md={d.colWidth}>
                  <div className={`img-container position-relative ${isBeachView ? 'beach-img' : ''}`}
                       onClick={(e) => this.showModal(e, d.passenger, d.isGolfCart, d.path)}>
                    <img onLoad={() => !objectPath.get(this.state, ['imageLoader', d.id]) &&
                      this.setImageLoaded(d.id, 'Loaded')}
                         className={`d-block img-fluid ${isBeachView ? 'beach-img' : ''} images`}
                         src={objectPath.get(this.state, ['imageLoader', d.id]) === 'Error' ?
                           errorImage : d.img ? d.img + `?h=${setImageSize.height}&w=${setImageSize.width}` : errorImage}
                         alt={d.title}
                         style={{height: !d.img ? '300px' : ''}}
                    />
                    <div className={`${!d.showOverlay ? 'bg-transparent' : ''}
                    ${isBeachView ? 'beach-img' : ''} overlay-effect`}/>
                    <div className={`position-absolute overlay-content`}>
                      <Carousel.Caption className={`h-100 py-3 px-2
                  ${d.isTextCenter ? 'd-flex justify-content-center align-items-center' :
                        'd-flex flex-column justify-content-between'}`}>
                        <h3 className={`cursor-pointer text-white ${!d.img ? 'no-image' : ''}
                        ${!d.isTextCenter ? 'text-left' : 'text-center'}`}>
                          {d.title}
                        </h3>
                        {d.activity_prices ? <div className="prices-view text-right">
                          {d.activity_prices.map((d1, index) => <span key={index}
                                                                      className={'mb-1 text-white' +
                                                                      ' d-block'}>{d1}</span>)}
                        </div> : null}
                      </Carousel.Caption>
                    </div>
                  </div>
                </Col>;
              })}
            </Row>
          </Carousel.Item>;
        }
      ) : null}
    </Carousel>}
             {
               showModal ? <Modal show={showModal} onHide={this.hideModal}>
                 <Modal.Header closeButton>
                   <Modal.Title className={'text-blue font-weight-bold'}>Booking
                     Online</Modal.Title>
                 </Modal.Header>
                 <Modal.Body className={'mt-2'}>
                   <Row>
                     <Col sm={6}>
                       <div className="date-view">
                         <Field component={PickDate}
                                name={'checkin_date'}
                                label="Delivery Date"
                                isSetMinDate={true}
                                onChangeDate={this.onChangeCheckIn}
                                minDate={moment().add(1, 'day')}
                                showLabel={!checkin}
                         />
                       </div>
                     </Col>
                     <Col sm={6}>
                       <div className="date-view py-0">
                         <Field component={DropDown}
                                name={'deliveryTime'}
                                optionList={deliveryTimeArray}
                                icon={'fa-clock-o'}
                                label="Delivery Time"/>
                       </div>
                     </Col>
                   </Row>
                   <Row>
                     <Col sm={6}>
                       <div className='date-view'>
                         <Field component={PickDate}
                                name={'checkout_date'}
                                label="Pick Up Date"
                                isSetMinDate={true}
                                showLabel={!checkout}
                                onChangeDate={this.onChangeCheckout}
                                minDate={checkin ? moment(checkin).add(1, 'day') : moment(new Date()).add(1, 'day')}
                         />
                       </div>
                     </Col>
                     <Col sm={6}>
                       <div className="date-view py-0">
                         <Field component={DropDown}
                                name={'pickupTime'}
                                optionList={pickUpTimeArray}
                                icon={'fa-clock-o'}
                                label="Pick Up Time"/>
                       </div>
                     </Col>
                   </Row>
                   <Row>
                     <Col sm={12}>
                       <div className="date-view py-0">
                         <Field component={DropDown}
                                name={'fuel'}
                                optionList={fuelList}
                                icon={'fa-fire'}
                                label="fuel"/>
                       </div>
                     </Col>
                   </Row>
                 </Modal.Body>
                 <Modal.Footer className={'d-flex align-items-center justify-content-center'}>
                   <Button type="submit" title="Book Now"
                           customClass="my-1 btn-checkout bg-blue"
                           loader={isLoading}
                           disabled={isLoading}
                           onClick={this.handleSubmit}
                           loaderView={<div className="spinner-border spinner-border-sm ml-2"/>}/>
                 </Modal.Footer>
               </Modal> : null
             }
    </>;
  }
}

const selector = formValueSelector('GolfCartAvailability');
const mapStateToProps = (state) => {
  return {
    checkin: selector(state, 'checkin_date'),
    checkout: selector(state, 'checkout_date'),
    fuelType: selector(state, 'fuel'),
    deliveryTime: selector(state, 'deliveryTime'),
    pickupTime: selector(state, 'pickupTime'),
    passenger: objectPath.get(state, 'AppReducer.passengers', ''),
    fuel: objectPath.get(state, 'AppReducer.fuels', '')
  };
};

export default withRouter(connect(mapStateToProps, {
  ResetReduxForm,
  checkGolfCartAvailabiity,
  SetBookingDates
})(reduxForm({
  form: 'GolfCartAvailability',
  enableReinitialize: true,
  destroyOnUnmount: false
})(Slider)));
