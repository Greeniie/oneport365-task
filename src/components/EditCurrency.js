import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import usd from "../images/usd.svg";
import ngn from "../images/ngn.svg";
import CustomSelect from "./CustomSelect";

const initialFormState = {
  currency: "USD",
  exchange_rate: "",
  customer_currency: "USD",
  is_base_currency: false,
};

function EditCurrency({ handleClose, handleCurrencyData }) {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [customerCurrency, setCustomerCurrency] = useState("USD");
  const [currencyFormData, setCurrencyFormData] = useState(initialFormState);

  const options = [
    { value: "USD", label: "USD", image: usd },
    { value: "NGN", label: "NGN", image: ngn },
  ];

  const clearFormData = () => {
    setCurrencyFormData(initialFormState);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrencyFormData({
      ...currencyFormData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const isYes = event.target.value === "yes";
    setCurrencyFormData({
      ...currencyFormData,
      is_base_currency: isYes,
    });
  };


  const handleEditCurrency = (e) => {
    e.preventDefault();

    const currencyObject = {
      exchange_rate: currencyFormData.exchange_rate,
      is_base_currency: currencyFormData.is_base_currency,
      currency: baseCurrency,
      customer_currency: customerCurrency,
    };

    handleCurrencyData(currencyObject);
    clearFormData();
    handleClose()
  };

  return (
    <>
      <Modal.Header closeButton onClick={clearFormData}>
        <Modal.Title className="px-[10px]">
          <div className="newHeader">Set Section Currency</div>
          <div className="newSub">Kindly set a currency and rate</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditCurrency} className="form px-[20px]">
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            style={{ marginBottom: "30px" }}
          >
            <Form.Label>Select currency</Form.Label>
            <CustomSelect
              options={options}
              onChange={(option) => setBaseCurrency(option.value)}
              value={baseCurrency}
              name="baseCurrency"
            />
          </Form.Group>
          <Form.Group
            controlId="exampleForm.ControlCheckboxes"
            style={{ marginBottom: "30px" }}
          >
            <Form.Label>Is this the base currency?</Form.Label>
            <div className="flex gap-[30px]">
              <div>
                <input
                  type="radio"
                  id="yes"
                  name="isBaseCurrency"
                  value="yes"
                  checked={currencyFormData.is_base_currency}
                  onChange={handleCheckboxChange}
                  className="custom-radio"
                />
                <label htmlFor="yes">
                  <span>Yes it is</span>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="no"
                  name="isBaseCurrency"
                  value="no"
                  checked={!currencyFormData.is_base_currency}
                  onChange={handleCheckboxChange}
                  className="custom-radio"
                />
                <label htmlFor="no">
                  <span>No</span>
                </label>
              </div>
            </div>
          </Form.Group>

          <div className="editnote flex gap-[5px] items-center">
            <div>
              <i className="fa fa-info-circle" aria-hidden="true"></i>
            </div>
            <div>
              <span className="font-bold">Note,</span> Base currency is the
              currency the customer will make payment in.
            </div>
          </div>
          <div
            style={{
              color:
                currencyFormData.is_base_currency === true
                  ? "rgb(243, 235, 235)"
                  : "",
            }}
          >
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginBottom: "30px" }}
            >
              <Form.Label>Customer's currency</Form.Label>
              <CustomSelect
                options={options}
                onChange={(option) => setCustomerCurrency(option.value)}
                value={customerCurrency}
                disabled={currencyFormData.is_base_currency === true}
                name="customerCurrency"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Enter rate</Form.Label>
              <div className="flex items-center">
                <img
                  className="rounded-sm h-[14px] mr-2"
                  src={customerCurrency === "USD" ? usd : ngn}
                  alt="currency"
                />
                <Form.Control
                  disabled={currencyFormData.is_base_currency === true}
                  type="number"
                  name="exchange_rate"
                  placeholder="Enter rate"
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
          </div>
        </Form>
        <Button
          className="w-full"
          onClick={handleEditCurrency}
          style={{
            marginTop: "30px",
            background: "#1F2937",
            color: "#fff",
            border: "none",
            width: "100%",
            padding: "10px 0",
          }}
          variant="primary"
        >
          Set section currency
        </Button>
      </Modal.Body>
    </>
  );
}

export default EditCurrency;
