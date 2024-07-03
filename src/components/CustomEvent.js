import React from 'react';

const CustomEvent = ({ event, isSelected}) => {
    return (
        <div className="event-title">
            <div className={isSelected ? 'selected-quote' : 'event-quotes'}>{event.quotes.length} {event.quotes.length > 1 ? 'Quotes' : 'Quote'}</div>
            <div className={isSelected ? 'selected-event' : 'evt-amount'}>
            <div className="event-ngn">Total NGN: ₦{event.totalAmountNGN.toFixed(2)}</div>
            <div className="event-usd">Total USD: ${event.totalAmountUSD.toFixed(2)}</div>
            </div>
           
        </div>
    );
};

export default CustomEvent;

