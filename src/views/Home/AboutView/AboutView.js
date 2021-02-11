import objectPath from 'object-path';
import React, {Component} from 'react';
import './AboutView.css';
import { connect } from 'react-redux';
import AboutImage from '../../../assets/img/fleet-aboutus.jpg';
import Button from '../../../components/Button/Button';
import {withRouter} from "react-router-dom";

class AboutView extends Component {
  render() {
    const {selectedCategory} = this.props;
    const isGolfCartSelected = selectedCategory === 'Golf Cart';
    return (<div className={`${isGolfCartSelected ? 'about-View-position' : 'about-View'}`}>
      <div className="container section">
        <div className={''}>
          <h5 className="about-text"> About Us </h5>
        </div>
        <div className="row image-content-view mt-4">
          <div className="col-md-6 d-flex justify-content-end">
            <div className="AboutImage">
              <img src={AboutImage} alt={''} className="About-Image-show"/>
              <div className="transparent-image"/>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-start">
            <div className="about-content">
              <h1 className="title-text-about"> Start with a cart… <br/> leave with a
                <span className="diffrent-text"> memory! </span></h1>
              <div className="desc-text mt-3">
                Rick's Beach Rentals began in 1999, as a small repair shop, with just a handful of rental units. We have since grown into Galveston Island's only, Certified Club Car Dealer, with the largest rental fleet on the Island. We strive to provide visitors, and residents alike, with a safe, easy, and FUN, golf cart experience. As well as fun activities with our 'Beach Toys'. We take pride in having unmatched customer service, and can't wait to serve YOU!
              </div>
              <div className="text-center text-sm-left mt-3">
                <Button title="Contact Us" onClick={() => {this.props.history.push('contact-us')}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  const selectedBookingDates = objectPath.get(state, 'CreateBooking.selectedBookingDates');
  return {
    selectedCategory: selectedBookingDates.category
  }
};
export default withRouter(connect(mapStateToProps, null)(AboutView));
