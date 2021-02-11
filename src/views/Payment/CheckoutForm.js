import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement
} from '@stripe/react-stripe-js/dist/react-stripe';
import objectPath from 'object-path';
import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createIntent, verifyOrder } from '../../redux/actions/helpers';
import './checkoutform.scss';

class CheckoutForm extends Component {
  state = {isLoading: false, clientSecret: '', isMounted: false};

  componentDidMount() {
    const {createIntent} = this.props;
    this.setState({isMounted: true}, () => {
      const obj = {id: localStorage.getItem('id')};
      createIntent(obj).then((response) => {
        return response;
      }).then(data => {
        if (data) {
          this.setState({clientSecret: data.clientSecret});
        }
      });
    });
  }

  componentWillUnmount() {
    this.setState({isMounted: false});
  }

  handleSubmit = async ev => {
    ev.preventDefault();
    const {clientSecret} = this.state;
    const {stripe, elements, verifyOrder, history} = this.props;
    const name = document.getElementById('name').value;
    if (!elements.getElement(CardNumberElement)._empty && name !== '') {
      this.setState({isLoading: true});

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement)
        }
      });
      if (!payload.error) {
        const obj = {id: localStorage.getItem('id'), key: payload.paymentIntent.id};
        verifyOrder(obj).then((res) => {
          if (objectPath.get(res, 'type') === 'error') {
            this.setState({isLoading: false});
            toast.error(objectPath.get(res, 'response.message'));
          } else {
            if (objectPath.get(res, 'meta.code') && objectPath.get(res, 'meta.code') === 0) {
              this.setState({isLoading: false});
              toast.error(objectPath.get(res, 'meta.message', ''));
            } else {
              this.setState({isLoading: false});
              toast.success(objectPath.get(res, 'meta.message', ''));
              localStorage.removeItem('seconds');
              localStorage.removeItem('id');
              history.push('/');
            }
          }
        });
      } else {
        this.setState({isLoading: false});
        toast.error(`Payment failed: ${payload.error.message}`);
      }
    } else {
      toast.error('Please enter card details to make payment');
    }
  };

  render() {
    const {stripe, finalAmount} = this.props;
    const {isLoading} = this.state;
    return (
      <div className={'stripe-checkout-form'}>
        <form id="payment-form p-3" onSubmit={this.handleSubmit}>
          <fieldset className="border">
            <legend className="mb-0 text-blue">
              <h4 className="mb-0 font-bold-roman">Pay with card</h4>
            </legend>
            <div className="my-3">
              <div className="d-flex align-items-center justify-content-center">
                <i className="fa fa-cc-mastercard mr-1 fs-45 text-blue"/>
                <i className="fa fa-cc-visa mr-1 fs-45 text-blue" aria-hidden="true"/>
                <i className="fa fa-cc-discover mr-1 fs-45 text-blue" aria-hidden="true"/>
              </div>
              <div className="my-3 mx-2">
                <FormGroup className={'mb-2'}>
                  <div className={'d-flex w-100'}>
                  <span className={'text-left'}>
                    <label className={'mb-0 payment-label'}>Your Card Number:</label>
                  </span>
                  </div>
                  <CardNumberElement
                    className='form-control donate-input-element'
                  />
                </FormGroup>
                <FormGroup className={'mb-2'}>
                  <label className={'mb-0 payment-label'}>Your Card Expiration Month:</label>
                  <CardExpiryElement
                    className='form-control donate-input-element'
                  />
                </FormGroup>
                <FormGroup className={'mb-2'}>
                  <label className={'mb-0 payment-label'}>Your Card CVV (3-digit security
                    number):</label>
                  <CardCvcElement
                    className='form-control donate-input-element'
                  />
                </FormGroup>
                <FormGroup className={'mb-2'}>
                  <label className={'mb-0 payment-label'}>Card Holder Name:</label>
                  <input className={'mt-0'} type={'text'} id="name" placeholder={'Name'}/>
                </FormGroup>
                <FormGroup className={'mb-2'}>
                  <button type="submit" disabled={!stripe || isLoading}>
                    Pay ${finalAmount && !isNaN(finalAmount) ? finalAmount : 0} {isLoading ? <div
                    className="spinner-border spinner-border-sm ml-2"/> : null}
                  </button>
                </FormGroup>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {secrect_key: objectPath.get(state, 'AppReducer.create_intent_data', '')};
};

export default withRouter(connect(mapStateToProps, {
  createIntent, verifyOrder
})(CheckoutForm));
