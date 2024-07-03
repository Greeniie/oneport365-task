import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "antd/dist/antd.variable.min.css";
import CustomToolBar from "../components/CustomToolbar";
import CustomEvent from "../components/CustomEvent";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuotes } from "../redux/QuoteSlice";

const localizer = momentLocalizer(moment);

const Home = (props) => {
  const quotes = useSelector((state) => state.quotes);
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(getAllQuotes());
  }, [dispatch]);

  const getEventsFromQuotes = (quotes) => {
    const events = [];

    if (Array.isArray(quotes)) {
      quotes.forEach((quote) => {
        const quoteDate = new Date(quote.quote_date);
        const quoteEvents = events.find(
          (event) => event.start.toDateString() === quoteDate.toDateString()
        );

        let totalAmountNGN = 0;
        let totalAmountUSD = 0;

        quote.sections.forEach((section) => {
          section.section_data.forEach((data) => {
            if (
              section.section_currency === "NGN" ||
              section.section_currency.currency === "NGN"
            ) {
              totalAmountNGN += data.amount;
            } else if (
              section.section_currency === "USD" ||
              section.section_currency.currency === "USD"
            ) {
              totalAmountUSD += data.amount;
            }
          });
        });

        if (quoteEvents) {
          quoteEvents.quotes.push(quote);
          quoteEvents.totalAmountNGN += totalAmountNGN;
          quoteEvents.totalAmountUSD += totalAmountUSD;
        } else {
          events.push({
            _id: quote._id,
            start: quoteDate,
            end: quoteDate,
            quotes: [quote],
            totalAmountNGN: totalAmountNGN,
            totalAmountUSD: totalAmountUSD,
          });
        }
      });
    }

    return events;
  };

  const events = getEventsFromQuotes(quotes?.data?.data);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeSidebar = () => {
    setSelectedEvent(null);
  };

  return (
    <div style={{ width: "95%", margin: "auto" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 730 }}
        components={{
          toolbar: CustomToolBar,
          event: (props) => (
            <CustomEvent
              {...props}
              isSelected={
                selectedEvent &&
                selectedEvent.start &&
                selectedEvent.start.toDateString() ===
                  props.event.start.toDateString()
              }
            />
          ),
        }}
        onSelectEvent={handleEventClick}
        dayPropGetter={(date) => {
          const isSelected =
            selectedEvent &&
            selectedEvent.start &&
            selectedEvent.start.toDateString() === date.toDateString();
          return {
            className: isSelected ? "selected-day" : "",
          };
        }}
      />
      {selectedEvent && (
        <Sidebar event={selectedEvent} onClose={closeSidebar} />
      )}
    </div>
  );
};

export default Home;
