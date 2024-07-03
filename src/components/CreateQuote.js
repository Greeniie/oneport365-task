import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../redux/ModalSlice";

const initialFormState = {
  start_time: "",
  end_time: "",
  quote_title: "",
};

function CreateQuote() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [quoteFormData, setquoteFormData] = useState(initialFormState);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };

  const clearFormData = () => {
    setquoteFormData(initialFormState);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setquoteFormData({
      ...quoteFormData,
      [name]: value,
    });
  };

  const handlecreatequote = (e) => {
    e.preventDefault();
    const formData = {
      start_time: selectedStartTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      end_time: selectedEndTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      quote_title: quoteFormData.quote_title,
    };

    navigate("/create", { state: formData });
    dispatch(closeModal());
  };

  useEffect(() => {
    const isStartTimeValid = selectedStartTime !== null;
    const isEndTimeValid = selectedEndTime !== null;
    const isTitleValid = quoteFormData.quote_title.trim() !== "";
    setIsFormValid(isStartTimeValid && isEndTimeValid && isTitleValid);
  }, [selectedStartTime, selectedEndTime, quoteFormData]);

  return (
    <>
      <Modal.Header closeButton onClick={clearFormData}>
        <Modal.Title className="px-[10px]">
          <div className="newHeader">Create New Quote</div>
          <div className="newSub">Enter quote name and time</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlecreatequote} className="form px-[20px]">
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Enter Quote Title</Form.Label>
            <Form.Control
              type="text"
              name="quote_title"
              placeholder="Enter quote title here"
              onChange={handleInputChange}
              value={quoteFormData.quote_title}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Start time</Form.Label>
                <DatePicker
                  selected={selectedStartTime}
                  onChange={handleStartTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm"
                  className="form-control"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>End time</Form.Label>
                <DatePicker
                  selected={selectedEndTime}
                  onChange={handleEndTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm"
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Button
          onClick={handlecreatequote}
          disabled={!isFormValid}
          style={{
            marginTop: "30px",
            background: "#007003",
            color: "#fff",
            border: "none",
            width: "100%",
            padding: "10px 0",
          }}
          variant="primary"
        >
          Create New Quote
        </Button>
        <Button
          onClick={() => dispatch(closeModal())}
          style={{
            margin: "10px 0",
            background: "#fff",
            color: "#E11435",
            border: "none",
            width: "100%",
          }}
          variant="primary"
        >
          Cancel
        </Button>
      </Modal.Body>
    </>
  );
}

export default CreateQuote;
