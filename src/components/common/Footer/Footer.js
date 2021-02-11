import objectPath from 'object-path';
import React, { Component } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import location from '../../../assets/img/icons/location.png';
import phone from '../../../assets/img/icons/phone.png';
import timer from '../../../assets/img/icons/timer.png';
import Button from '../../../components/Button/Button';
import { Inquiry, ResetReduxForm } from '../../../redux/actions/helpers';
import * as routes from '../../constants/routes';
import RenderInputField from '../Fields/render-input-field';
import RenderTextAreaField from '../Fields/render-text-area-field';
import './Footer.scss';

class Footer extends Component {
  state = {};

  componentDidMount() {
    const {change} = this.props;
    change('first_name', '');
    change('last_name', '');
    change('email', '');
    change('message', '');
  }

  handleSubmit = (obj) => {
    const {Inquiry, initialize} = this.props;
    if (obj.first_name && obj.last_name && obj.email && obj.message) {
      this.setState({isLoading: true});
      Inquiry(obj).then((r) => {
        if (objectPath.get(r, 'type') === 'error') {
          this.setState({isLoading: false});
          toast.error(objectPath.get(r, 'response.message'));
        } else {
          this.setState({isLoading: false});
          if (!objectPath.get(r, 'meta.code')) {
            toast.error(objectPath.get(r, 'meta.message', 'Something went wrong.'));
            initialize({first_name: '', last_name: '', email: '', message: ''});
          } else {
            toast.success(objectPath.get(r, 'meta.message', 'Inquiry sent successfully.'));
            initialize({first_name: '', last_name: '', email: '', message: ''});
          }
        }
      });
    } else {
      validate(obj);
    }
  };

  render() {
    const {isLoading} = this.state;
    const {handleSubmit} = this.props;
    return (<Row className="footer-view">
      <Col sm={12} md={6} className="p-0">
        <div className="inquiry-view">
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <h1 className="inquiry-text"> Inquiry </h1>
            <Row className={'mt-3'}>
              <Col sm={6}>
                <Form.Group className="custom-input-div">
                  <Field component={RenderInputField}
                         type="text"
                         placeholder="First Name"
                         name="first_name"/>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="custom-input-div">
                  <Field component={RenderInputField}
                         type="text"
                         placeholder="Last Name"
                         name="last_name"/>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="custom-input-div">
              <Field component={RenderInputField}
                     type="email"
                     placeholder="Email Address"
                     name="email"/>
            </Form.Group>
            <Form.Group className="custom-input-div">
              <Field component={RenderTextAreaField}
                     placeholder="Message"
                     rows={4}
                     name="message"/>
            </Form.Group>
            <Form.Group
              className="d-flex align-items-center justify-content-sm-end justify-content-center">
              <Button type={'submit'}
                      loader={isLoading}
                      disabled={isLoading}
                      loaderView={<div className="spinner-border spinner-border-sm ml-2"/>}
                      title="Send Message" background="#104772"/>
            </Form.Group>
          </form>
        </div>
      </Col>
      <Col sm={12} md={6} className="p-0">
        <div className="contect-foote-view">
          <h1 className="footer-contect-text" style={{marginLeft: '-18px'}}> Contact us </h1>
          <div className="footer-address-view">
            <div className="row align-items-start mt-3">
              <div className="icon-col">
                <img alt={''} src={location} className="footer-icon"/>
              </div>
              <div className="text-col col-md-5 col-10">
                17620 Termini San Luis Pass Rd. Galveston, TX 77554
              </div>
            </div>
            <div className="row align-items-start">
              <div className="icon-col">
                <img alt={''} src={phone} className="footer-icon"/>
              </div>
              <div className="text-col col-md-5 col-10">
                409-632-0256
              </div>
            </div>
            <div className="row align-items-start">
              <div className="icon-col">
                <img alt={''} src={timer} className="footer-icon"/>
              </div>
              <div className="text-col col-md-5 col-10">
                Daily 9 am - 5 pm
              </div>
            </div>
          </div>
          <div className="link-text">
            <div className="row">
              <div className="col-md-6 px-0">
                <h1 className="footer-link-text"> Quick Link </h1>
                <NavLink exact to={routes.HOME}>
                  <span className="footer-link">Home</span>
                </NavLink><br/>
                <NavLink exact to={routes.ABOUTUS}>
                  <span className="footer-link">About us</span>
                </NavLink> <br/>
                <NavLink exact to={routes.CONTACTUS}>
                  <span className="footer-link">Contact us</span>
                </NavLink> <br/> <br/>
              </div>
              <div className="col-md-6 px-0">
                <h1 className="footer-link-text"> Help Center </h1>
                <NavLink exact to={routes.FAQ}>
                  <span className="footer-link">Faq</span>
                </NavLink> <br/>
                <NavLink exact to={routes.PRIVACYPOLICY}>
                  <span className="footer-link">Privacy Policy</span>
                </NavLink> <br/>
                <NavLink exact to={routes.TERMSANDCONDITIONS}>
                  <span className="footer-link">Terms & Conditions</span>
                </NavLink> <br/>
              </div>
            </div>
          </div>
          <br/>
          <hr/>
          <div className="copyright-view">
            <p className="copyright-text"> Copyright © 2020 Rick's Beach. </p>
          </div>
        </div>
      </Col>
    </Row>);
  }
}

const validate = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = 'First name is required.';
  }
  if (!values.last_name) {
    errors.last_name = 'Last name is required.';
  }
  if (!values.email) {
    errors.email = 'Email is required.';
  }
  if (values.email && !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email))) {
    errors.email = 'Please enter valid email.';
  }
  if (!values.message) {
    errors.message = 'Message is required.';
  }
  return errors;
};

export default (connect(null, {Inquiry, ResetReduxForm})(reduxForm({
  form: 'InquiryForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {first_name: '', last_name: '', email: '', message: ''},
  validate
})(Footer)));

