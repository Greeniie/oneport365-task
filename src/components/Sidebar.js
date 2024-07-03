import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../redux/ModalSlice";
import CreateQuote from "./CreateQuote";
import QuoteDetails from "./QuoteDetails";

const Sidebar = ({ event, onClose }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  const [show, setShow] = useState(false);
  const [draft, setDraft] = useState();

  useEffect(() => {
    retrieveDraftData();
  }, []);

  if (!event) return null;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const retrieveDraftData = () => {
    try {
      const draftDataJSON = localStorage.getItem("draftQuote");

      if (draftDataJSON) {
        const draftData = JSON.parse(draftDataJSON);
        setDraft(draftData);
      } else {
        console.log("No draft data found in localStorage");
      }
    } catch (error) {
      console.error("Error retrieving draft data from localStorage:", error);
    }
  };

  return (
    <div className="sidebar">
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "30px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="today">TODAY</div>
            <div>{moment().format("DD/MM/YYYY")}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              <span className="tempbold">55º</span>
              <span className="templight">/40º</span>
            </div>
          </div>
        </div>
        <div className="scroll">
          <div>
            {event.quotes.map((quote, i) => (
              <div key={i} className="quote-wrap" onClick={handleShow}>
                <div className="quote" style={{ position: "relative" }}>
                  <div
                    className="quote-wrapper"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="quote-amount">
                      ₦{event.totalAmountNGN.toFixed(2)}
                    </div>
                    <div className="quote-time">
                      {moment(quote.createdAt).format("h:mma")}
                    </div>
                  </div>
                  <div className="quote-title">{quote.quote_title}</div>
                </div>
              </div>
            ))}
          </div>

          
        </div>
        <div>
            {draft && (
              <div className="quote-wrap" onClick={handleShow}>
                <div className="quote" style={{ position: "relative" }}>
                  <div
                    className="quote-wrapper"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="flex items-center gap-[50px]">
                      <div className="quote-amount">₦</div>
                      <div className="quote-time text-[12px] rounded">
                        draft
                      </div>
                    </div>

                    <div className="quote-time">
                      {moment(draft.quote_date).format("h:mma")}
                    </div>
                  </div>
                  <div className="quote-title">{draft.quote_title}</div>
                </div>
              </div>
            )}
          </div>
      </div>

      <div className="flex gap-[10px]">
        <button
          className="createbutton w-[full]"
          onClick={() => dispatch(openModal())}
        >
          <span>
            <i className="fa fa-plus pr-[5px]" aria-hidden="true"></i>Add new
            quote
          </span>
        </button>

        <button className="close-button" onClick={onClose}>
          <i className="fa fa-close" aria-hidden="true"></i>
        </button>

        <Modal show={isOpen} onHide={() => dispatch(closeModal())} centered>
          <CreateQuote />
        </Modal>
        <Modal show={show} onHide={handleClose} size="xl">
          <QuoteDetails id={event._id} handleClose={handleClose} />
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;
