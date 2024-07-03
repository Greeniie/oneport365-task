import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import logo from "../images/download.png";
import QuoteTable1 from "./QuoteTable1";
import QuoteTable2 from "./QuoteTable2";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { createQuote, getAllQuotes } from "../redux/QuoteSlice";

const Preview = ({ modalData, handleClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateNewQuote = (e) => {
    e.preventDefault();

    setConfirmLoading(true);
    dispatch(createQuote(modalData))
      .then((response) => {
        setConfirmLoading(false);
        if ((response.status = "success")) {
          navigate("/");
          notification.success({
            message: "Quote created successfully",
          });
          handleClose(); // Close the modal
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.error("Error creating quote", error);
        notification.error({
          message: "Error creating quote, please try again",
        });
      });
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(modalData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quote_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(233, 233, 233, 0.2)",
          padding: "0 20px",
        }}
      >
        <div>
          <Modal.Title className="block md:flex items-center gap-[20px]">
            <div> {modalData?.quote_title} </div>
            <div className="detail text-[12px] md:text-[20px] w-[80%] md:w-full">
              {" "}
              {moment(modalData.quote_date).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </Modal.Title>
        </div>
        <div className="flex gap-[5px] md:gap-[20px] items-center mr-[0px] md:mr-[45px]">
          <div>
            <button className="save-button" onClick={handleCreateNewQuote}>
              {confirmLoading ? "Saving" : "Save quote"}
            </button>
          </div>
          <div className="styled-line"></div>
          <div>
            <button className="download-button" onClick={handleDownload}>
              <div>
                <i className="fa fa-download" aria-hidden="true"></i>
              </div>
            </button>
          </div>
          <div>
            <button className="close-button" onClick={handleClose}>
              <div>
                <i className="fa fa-close" aria-hidden="true"></i>
              </div>
            </button>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="my-[20px] mx-[0px] md:my-[30px] md:mx-[50px] h-[600px] overflow-scroll">
        <div className="details p-[10px] md:p-[30px]">
          <div className="block md:flex items-center justify-between mb-[50px]">
            <div>
              <img src={logo} alt="logo" className="h-[72px] w-auto" />
            </div>
            <div className="address text-center md:text-right pt-[10px] md:pt-[0px]">
              UAC Building Marina <br />
              Lagos, Nigeria <br />
              100223
            </div>
          </div>
          <div className="customer">
            <div className="info1 block md:flex justify-between pb-[35px]">
              <div className="flex flex-col gap-[30px]">
                <div>
                  <div className="d-head">Attention (Customer Name)</div>
                  <div className="info">Daniel Alobode</div>
                </div>
                <div>
                  <div className="d-head">Chargeable weight (KG)</div>
                  <div className="info">55.34KG</div>
                </div>
              </div>
              <div className="flex flex-col gap-[30px]">
                <div>
                  <div className="d-head">Email address</div>
                  <div
                    className="emailadd"
                    style={{ color: "rgba(0, 112, 3, 1)" }}
                  >
                    ample@mail.com
                  </div>
                </div>
                <div>
                  <div className="d-head">POL (Port of Loading)</div>
                  <div className="info">Lagos city</div>
                </div>
              </div>
              <div className="flex flex-col gap-[30px]">
                <div>
                  <div className="d-head">Commodity</div>
                  <div className="emailadd">Electric goods</div>
                </div>
                <div>
                  <div className="d-head">POD (Port of Destination)</div>
                  <div className="info">Johannesburg</div>
                </div>
              </div>
              <div className="flex flex-col gap-[30px]">
                <div>
                  <div className="d-head">Service Type</div>
                  <div className="emailadd">Export Air Freight</div>
                </div>
                <div>
                  <div
                    className="d-head"
                    style={{ color: "rgba(225, 20, 53, 1)" }}
                  >
                    Due Date
                  </div>
                  <div className="info">23rd, March 2024</div>
                </div>
              </div>
            </div>
            <div className="pt-[30px] block md:flex items-center justify-between">
              <div className="flex-1">
                <div className="d-head">Collection Address</div>
                <div classname="info">
                  INNIO Waukesha Gas Engines 8123 116th Street, Suite 300, SW
                  Side of Building, Dock 46-50, Pleasant Prairie, WI 53158
                </div>
              </div>
              <div className="text-right flex-1">
                <div className="d-head">Delivery Destination</div>
                <div classname="info">TPG PH</div>
              </div>
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="qb">Quote Breakdown</div>
            <div className="origin">ORIGIN HANDLING CHARGES</div>
            {modalData && Object.keys(modalData?.sections).length > 0 && (
              <div>
                <QuoteTable1 data={modalData} />
              </div>
            )}
          </div>
          <div className="mt-[40px]">
            <div className="origin">DESTINATION HANDLING CHARGES</div>
            {modalData && Object.keys(modalData?.sections).length > 0 && (
              <div>
                <QuoteTable2 data={modalData} />
              </div>
            )}
          </div>
          <div className="note my-[40px] flex gap-[5px]">
            <div>
              <i className="fa fa-info-circle" aria-hidden="true"></i>
            </div>
            <div>
              <div className="mb-[30px]">
                Please note that this offer is firm for acceptance within 48
                hours, otherwise above offer will be considered invalid. Rates
                advised is subject to prevailing parallel market rate at time of
                invoice. Freight advised is subject to chargeable weight as
                declared by airline. Above tariff is not applicable to
                non-compliant shipments without form Ms, PAARs.
              </div>
              <div>
                NOTE: Duty and tax not included in the rates advised. They will
                be advised when you provide the CIF value and H.S code. We do
                trust that this offer meets your requirements. Please contact us
                if further explanation is required.
              </div>
            </div>
          </div>
          <div>
            <div className="origin mb-[20px]">
              ONEPORT365 TERMS AND CONDITIONS
            </div>
            <div className="terms">
              <ol>
                <li>
                  <div className="listitem">
                    Above rates are for cargo details provided by you.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Above quote is/are subject to VAT.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Above quoted rates are on Door-to-Door basis excludes Duties
                    at the time of exports.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Standard trading terms and conditions of Oneport365 applies.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Above rates excludes services like packing, re-packing,
                    customs inspection etc which maybe charged additional (if
                    required) with prior customer approval.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Above rates do not cover insurance charges.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Above rates do not include any additional services required
                    e.g.- special handling, weekend pickup/delivery which has
                    not been agreed and same will be charged as mutually agreed
                    before services are rendered.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Above rates apply for weight/volume (whichever is higher).
                    Rates are based on ratio 1:6.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Quoted rates are valid for a period of one month and would
                    require prior approval from OnePort365 in case further
                    extension is required.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Charges are based on shipping details provided by you. If
                    quantity/weight vary, our quotation will change accordingly.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Pricing team has the right to reprice if the actual cargo
                    details differ from the information indicated in enquiry.
                  </div>
                </li>
                <li>
                  <div className="listitem">
                    Unless otherwise specified, any haulage included within the
                    quotes is based upon standard roadside only and between
                    business hours from Monday to Friday.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Modal.Body>
      <ToastContainer />
    </div>
  );
};

export default Preview;
