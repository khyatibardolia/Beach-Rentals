import React from 'react';
import { withRouter } from 'react-router-dom';
import cost from '../../../assets/img/icons/cost.png';
import employee from '../../../assets/img/icons/employee.png';
import golf from '../../../assets/img/icons/golf.png';
import support from '../../../assets/img/icons/support.png';
import Button from '../../../components/Button/Button';
import './ContactView.css';
import IconText from './IconText';

const ContactView = ({history}) => {
  return <div className="contact-view">
    <div className={'container section'}>
      <div className="row">
        <div className="col-md-6 mt-3">
          <h1 className="info-text-title"> {'Why'} <span
            className="info-text-title-inner"> Rick's Beach <br/> Rentals? </span></h1>
          {/*<p className="desc-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>*/}
          <div className="text-center text-sm-left mt-4">
            <Button title="Contact Us" customClass='m-0' onClick={() => {history.push('contact-us');}}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <IconText Icon={employee} text="Competitive Pricing"/>
            </div>
            <div className="col-md-12 col-lg-6">
              <IconText Icon={support} text="Customer Services"/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <IconText Icon={golf} text="Flexible Rent Options"/>
            </div>
            <div className="col-md-12 col-lg-6">
              <IconText Icon={cost} text="No Hidden Taxes"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default withRouter(ContactView);
