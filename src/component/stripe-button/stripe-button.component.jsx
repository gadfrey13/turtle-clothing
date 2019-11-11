import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_S6I8WRTgwQ8HdvnpY3UjpWBr00Eccansmq";

    const onToken = token => {
        console.log(token);
        alert('Payment Success');
    }

    return(
        <StripeCheckout 
        label="Pay Now" 
        name="Turtle Clothing Ltd" 
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description= {`Your totla is $${price}`}
        panelLabel= 'Pay Now'
        token={onToken}
        stripeKey={publishableKey}   
        />
    )
};

export default StripeCheckoutButton;