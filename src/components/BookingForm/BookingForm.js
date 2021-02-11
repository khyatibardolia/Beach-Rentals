import moment from 'moment';
import objectPath from 'object-path';
import React, { useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import DropDown from '../../components/common/Fields/Dropdown/DropDown';
import { deliveryTimeArray, pickUpTimeArray } from '../../components/common/timeArray';
import PickDate from '../../components/common/Fields/PickDate/PickDate';
import { SetBookingDates } from '../../redux/actions/create-booking';
import { checkGolfCartAvailabiity } from '../../redux/actions/helpers';
import { SET_BOOKING_DATES } from '../../redux/constants';
import './style.css';

const BookingForm = ({SetBookingDates, checkin, change, checkout, history, category, fuels_list, checkGolfCartAvailabiity, passengersList, match, handleSubmit}) => {
  const [isLoading, setLoader] = useState(false);
  const submitForm = (obj) => {
    if (!obj.checkin) {
      toast.error('Please Select Delivery Date to proceed booking.');
    } else if (!obj.checkout) {
      toast.error('Please Select Pick Up Date to proceed booking.');
    } else if (!obj.deliveryTime) {
      toast.error('Please Select Delivery Time to proceed booking.');
    } else if (!obj.pickupTime) {
      toast.error('Please Select Pick Up Time to proceed booking.');
    } else if (!obj.category || (obj.category && obj.category === 'Category')) {
      toast.error('Please Select Category to proceed booking.');
    } else {
      SetBookingDates(SET_BOOKING_DATES, {
        checkin: obj.checkin,
        checkout: obj.checkout,
        deliveryTime: obj.deliveryTime,
        pickupTime: obj.pickupTime,
        category: obj.category
      });
      if (obj.category === 'Golf Cart') {
        if (!obj.passenger || (obj.passenger && obj.passenger === 'Select passenger')) {
          toast.error('Please Select no. of passengers to proceed booking.');
        } else if (!obj.fuel || (obj.fuel && obj.fuel === 'Select fuel')) {
          toast.error('Please Select cart fuel to proceed booking.');
        } else {
          const selectedCart = passengersList && passengersList.length && passengersList.find(d => obj.passenger === d.name);
          const selectedFuel = fuels_list && fuels_list.length && fuels_list.find(d => obj.fuel === d.name);
          let dataObj = {
            passenger_id: selectedCart.id,
            check_in: obj.checkin + ' ' + obj.deliveryTime,
            check_out: obj.checkout + ' ' + obj.pickupTime,
            fuel_id: selectedFuel.id
          };
          setLoader(true);
          checkGolfCartAvailabiity(dataObj).then((res) => {
            if (objectPath.get(res, 'meta.code') && objectPath.get(res, 'meta.code') === 0) {
              toast.error(objectPath.get(res, 'meta.message', ''));
              setLoader(false);
            } else if (objectPath.get(res, 'response.code') === 400) {
              toast.error(objectPath.get(res, 'response.message'));
              setLoader(false);
            } else if (objectPath.get(res, 'type') === 'error') {
              toast.error(objectPath.get(res, 'response.message', ''));
              setLoader(false);
            } else {
              history.push(`/reserve/${objectPath.get(res, 'data.product_id')}/1`);
              setLoader(false);
            }
          });
          /*const ele = document.getElementsByClassName('rental-view')[0];
          if (ele) {
            ele.scrollIntoView();
          }*/
        }
      } else {
        const ele = document.getElementsByClassName('beach-view')[0];
        if (ele) {
          ele.scrollIntoView();
        }
      }
    }
  };

  const onChangeCheckIn = (d) => {
    change('checkout', moment(d).add(1, 'day').format('YYYY-MM-DD'));
  };

  const onChangeCheckout = (d) => {
     change('checkout', moment(d).add(1, 'day').format('YYYY-MM-DD'));
  };

  const categoryList = [{
    title: 'Category'
  }, {
    title: 'Golf Cart'
  }, {
    title: 'Beach Toys'
  }];

  let passengerList = [], fuelList = [];
  passengersList && passengersList.length && passengersList.forEach((d) => {
    const obj = {};
    obj.title = d.name;
    passengerList[0] = {title: 'Select passenger'};
    passengerList.push(obj);
    return passengerList;
  });

  fuels_list && fuels_list.length && fuels_list.forEach((d) => {
    const obj = {};
    obj.title = d.name;
    fuelList[0] = {title: 'Select fuel'};
    fuelList.push(obj);
    return fuelList;
  });

  const handleChange = (e) => {
    SetBookingDates(SET_BOOKING_DATES, {
      category: e.target.value
    });
  };

  return <div className="main-booking w-100">
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="form-view">
        <div className="title-view">
          <span className="title">Booking Online</span>
        </div>
        <div className={'row d-flex'}>
          <div className={'col-md-6 col-lg-6 col-sm-2'}>
            <div className="date-view">
              <Field component={PickDate}
                     name={'checkin'}
                     label="Delivery Date"
                     showLabel={!checkin}
                     onChangeDate={onChangeCheckIn}
                     isSetMinDate={true}
                     minDate={moment().add(1, 'day')}/>
            </div>
          </div>
          <div className={'col-md-6 col-lg-6 col-sm-2'}>
            <div className="date-view py-0">
              <Field component={DropDown}
                     name={'deliveryTime'}
                     optionList={deliveryTimeArray}
                     icon={'fa-clock-o'}
                     label="Delivery Time"/>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-sm-6'}>
            <div className="date-view">
              <Field component={PickDate}
                     name={'checkout'}
                     label="Pick Up Date"
                     isSetMinDate={true}
                     showLabel={!checkout}
                     onChangeDate={onChangeCheckout}
                     minDate={checkin ? moment(checkin).add(1, 'day') : moment(new Date()).add(1, 'day')}
              />
            </div>
          </div>
          <div className={'col-sm-6'}>
            <div className="date-view py-0">
              <Field component={DropDown}
                     name={'pickupTime'}
                     optionList={pickUpTimeArray}
                     icon={'fa-clock-o'}
                     label="Pick Up Time"/>
            </div>
          </div>
        </div>
        <div className="date-view py-0">
          <Field component={DropDown}
                 name={'category'}
                 onChange={handleChange}
                 optionList={categoryList}
                 isCategory={true}
                 label="Category"/>
        </div>
        {category === 'Golf Cart' ?
          <div className={'row'}>
            <div className={'col-sm-6'}>
              <div className="date-view py-0">
                <Field component={DropDown}
                       name={'passenger'}
                       optionList={passengerList}
                       icon={'fa-users'}
                       label="passenger"/></div>
            </div>
            <div className={'col-sm-6'}>
              <div className="date-view py-0">
                <Field component={DropDown}
                       name={'fuel'}
                       optionList={fuelList}
                       icon={'fa-fire'}
                       label="fuel"/>
              </div>
            </div>
          </div>
          : null}
      </div>
      <div className="button-show">
        <div className="row">
          <div className="col-sm-12 w-100 d-flex">
            <button className="p-0 m-0 transparent btn w-100" type="submit">
              <span className="title-text float-left ml-1">Book Now</span>
              <span className={'float-right mt-1'}>
                {!isLoading ? <><i className="fa fa-long-arrow-right" aria-hidden="true"
                                   style={{color: 'yellow'}}/></>
                  : <div className="spinner-border spinner-border-sm my-auto"/>}
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>;
};

const selector = formValueSelector('BookingPage');
const mapStateToProps = (state) => {
  const selectedBookingDates = objectPath.get(state, 'CreateBooking.selectedBookingDates');
  return {
    selectedBookingDates,
    checkin: selector(state, 'checkin'),
    checkout: selector(state, 'checkout'),
    category: selector(state, 'category')
  };
};

export default withRouter(connect(mapStateToProps, {
  SetBookingDates,
  checkGolfCartAvailabiity
})(reduxForm({
  form: 'BookingPage',
  enableReinitialize: true,
  destroyOnUnmount: false
})(BookingForm)));
