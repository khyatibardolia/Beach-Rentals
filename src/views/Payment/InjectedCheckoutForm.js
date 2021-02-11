import { ElementsConsumer } from '@stripe/react-stripe-js/dist/react-stripe';
import React from 'react';
import CheckoutForm from './CheckoutForm';

export const InjectedCheckoutForm = ({finalAmount}) => {
  return (
    <ElementsConsumer>
      {({elements, stripe}) => (
        <CheckoutForm elements={elements} stripe={stripe} finalAmount={finalAmount}/>
      )}
    </ElementsConsumer>
  );
};
