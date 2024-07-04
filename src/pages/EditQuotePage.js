import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CreateQuote from "../components/CreateQuote";
import { openModal, closeModal } from "../redux/ModalSlice";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import QuoteTableForm from "../components/QuoteTableForm";
import usd from "../images/usd.svg";
import ngn from "../images/ngn.svg";
import EditCurrency from "../components/EditCurrency";
import Preview from "../components/Preview";
import { saveDraft } from "../redux/QuoteSlice";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import { notification } from "antd";

const EditQuotePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const location = useLocation();
  const singleData = location.state;
  const [sections, setSections] = useState([
    { quoteData: {}, currencyData: {} },
  ]);

  const [show, setShow] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  let today = new Date();
  let utcOffset = +1; // GMT+1

  let utcTime = today.getTime() + today.getTimezoneOffset() * 60000;
  let adjustedDate = new Date(utcTime + 3600000 * utcOffset);

  let day = adjustedDate.getDate();
  let month = adjustedDate.getMonth() + 1;
  let year = adjustedDate.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;

  const now = moment().utcOffset(+1);
  const momentFormattedDate = now.format("ddd Do, MMMM YYYY");

  const addSection = () => {
    setSections([...sections, { quoteData: {}, currencyData: {} }]);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleQuoteDataChange = (index, data) => {
    const newSections = [...sections];
    newSections[index].quoteData = data;
    setSections(newSections);
  };

  const handleCurrencyDataChange = (index, data) => {
    const newSections = [...sections];
    newSections[index].currencyData = data;
    setSections(newSections);
  };

  const currentDate = moment().startOf("day").toISOString();


  console.log(singleData)
  useEffect(() => {
    setEditFormData({
      quote_title: singleData?.quote_title,
      quote_date: singleData?.quote_date,
      sections: singleData?.sections.map((section, index) => ({
        section_name: section?.section_name, 
        section_number: index + 1,
        section_currency: {
          currency: section.currencyData.currency,
          exchange_rate: section.currencyData.exchange_rate,
          is_base_currency: section.currencyData.is_base_currency,
          customer_currency: section.currencyData.customer_currency,
        },
        section_data: section.quoteData.section_data,
      })),
    });
  }, []);

  console.log(editFormData)

  const data = {
    quote_title: editFormData.quote_title,
    quote_date: editFormData.quote_date,
    sections: editFormData.sections.map((section, index) => ({
      section_name: `Section ${index + 1}`, // Assuming section names follow this pattern
      section_number: index + 1,
      section_currency: {
        currency: section.currencyData.currency,
        exchange_rate: section.currencyData.exchange_rate,
        is_base_currency: section.currencyData.is_base_currency,
        customer_currency: section.currencyData.customer_currency,
      },
      section_data: section.quoteData.section_data,
    })),
  };

  const handlePClose = () => setShowPreviewModal(false);
  const handlePShow = () => {
    setShowPreviewModal(true);
  };

  const handleCreateQuote = (e) => {
    e.preventDefault();
    setShowPreviewModal(true);
  };

  const handleSaveDraft = () => {
    const draftData = {
      quote_title: singleData.quote_title,
      quote_date: currentDate,
      sections: sections.map((section, index) => ({
        section_name: `Section ${index + 1}`,
        section_number: index + 1,
        section_currency: {
          currency: section.currencyData.currency,
          exchange_rate: section.currencyData.exchange_rate,
          is_base_currency: section.currencyData.is_base_currency,
          customer_currency: section.currencyData.customer_currency,
        },
        section_data: section.quoteData.section_data,
      })),
    };

    dispatch(saveDraft(draftData))
      .then((response) => {
        notification.success({
          message: "Quote saved successfully",
        });
        navigate("/");
      })
      .catch((error) => {
        notification.error({
          message: "Error saving quote, please try again",
        });
      });
  };

  return (
    <div>
      <div className="bg-[#FAFAFA] py-[10px] md:py-[30px] px-[20px] md:px-[50px] mb-[50px] gap-[30px] flex justify-between items-center">
        <div>
          <div className="back" onClick={() => navigate("/")}>
            <i className="fa fa-angle-left pr-[5px]" aria-hidden="true"></i>Back
            to quotes
          </div>
          <div className="qt">
            {editFormData?.quote_title}
            <span className="text-[#9CA3AF] pl-[15px]">[{editFormData?.quote_date}]</span>
          </div>
        </div>
        <div className="flex-row md:flex-col items-center md:gap-[10px]">
          <Button
            style={{
              padding: "10px 14px",
              background: "#fff",
              color: "#6B7280",
              borderRadius: "4px",
              border: "none",
            }}
            className="cbtn mb-[10px] md:mb-[0px] mr-[0px] mr-[25px]"
            onClick={handleSaveDraft}
          >
            Save as draft
          </Button>
          <Button
            style={{
              padding: "10px 14px",
              background: "rgba(55, 178, 72, 0.2)",
              color: "rgba(0, 92, 0, 1)",
              borderRadius: "4px",
              border: "none",
            }}
            className="cbtn"
            onClick={handlePShow}
          >
            <i className="fa fa-eye pr-[10px]" aria-hidden="true"></i>
            Preview
          </Button>
        </div>
      </div>

      <div className="px-[10px] md:px-[50px] block md:grid md:grid-cols-10 gap-[50px]">
        <div className="col-span-7">
          <div className="bg-[#F9FAFB] py-[8px] px-[16px] flex items-center gap-[10px]">
            <div className="change">Change Quote Time</div>
            <div className="qdate text-[#776D7D]">
              <span className="text-[#007003]">{momentFormattedDate}</span>{" "}
              {editFormData?.start_time} - {editFormData?.end_time}{" "}
              <i
                className="fa fa-chevron-down"
                aria-hidden="true"
                onClick={() => dispatch(openModal())}
              ></i>
            </div>
          </div>
          <Form>
            {editFormData?.sections.map((section, index) => (
              <div key={index} className="mb-4 relative">
                <QuoteTableForm
                  onQuoteDataChange={(data) =>
                    handleQuoteDataChange(index, data)
                  }
                />
                {editFormData?.sections.length > 1 && index === editFormData?.sections.length - 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="absolute top-0 right-0 bg-none text-[#C70024] p-2"
                  >
                    Remove Section
                  </button>
                )}
              </div>
            ))}
            <Button
              style={{
                background: "rgba(55, 178, 72, 0.1)",
                border: "none",
                color: "#00861E",
              }}
              type="button"
              onClick={addSection}
              className="add my-4 w-full"
            >
              Add Quote Table
            </Button>

            <div
              className="mt-[20px] py-[30px] block md:flex text-center md:text-left md:justify-between items-center"
              style={{ borderTop: "1px solid rgba(230, 231, 236, 1)" }}
            >
              <Button
                onClick={() => navigate("/")}
                data-tooltip-id="my-tooltip-1"
                style={{
                  background: "rgba(229, 231, 235, 1)",
                  border: "none",
                  color: "#C70024",
                  padding: "10px, 32px, 10px, 32px",
                  fontSize: "14px",
                }}
                type="button"
                className="add mr-[20px] md:mr-[0px]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateQuote}
                style={{
                  background: "rgba(16, 155, 50, 1)",
                  border: "none",
                  color: "#fff",
                  padding: "10px, 32px, 10px, 32px",
                  fontSize: "14px",
                }}
                type="button"
                className="add"
              >
                Save Quote
              </Button>
              <ReactTooltip
                id="my-tooltip-1"
                place="top"
                content="You will lose all the data 
        inputted if you cancel"
              />
            </div>
          </Form>
        </div>

        <div className="col-span-3">
          <div className="mt-[10px] md:mt-[0]">
            {editFormData?.sections.map((section, index) => (
              <div className="curr" key={index}>
                <div className="ss flex justify-between items-center">
                  <div className="sec">Section Currency</div>
                  <div className="usd flex gap-[5px] items-center">
                    <div>USD</div>
                    <img
                      className="rounded-sm h-[14px] w-full"
                      src={usd}
                      alt="usd"
                    />
                  </div>
                </div>

                <div className="cnr">Currency & Rate</div>
                <div className="flex gap-[10px]  items-center">
                  <div className="py-[13px] px-[16px] border rounded-sm">
                    <img
                      className="rounded-sm h-[14px] w-full"
                      src={usd}
                      alt="usd"
                    />
                  </div>
                  <div>
                    <i
                      className="fa fa-exchange text-[#9CA3AF]"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="flex items-center gap-[10px] py-[12px] px-[16px] text-left w-[73%] border rounded-sm">
                    <img className="rounded-sm h-[14px]" src={ngn} alt="ngn" />
                    <div>
                      {section?.section_currency?.exchange_rate &&
                        section?.section_currency.exchange_rate}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleShow}
                  style={{
                    background: "#F3F4F6",
                    border: "none",
                    color: "#1F2937",
                  }}
                  type="button"
                  className="add my-4 w-full"
                >
                  Edit section currency
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={isOpen} onHide={() => dispatch(closeModal())} centered>
        <CreateQuote />
      </Modal>
      <Modal show={show} onHide={handleClose} centered>
        <EditCurrency
          handleClose={handleClose}
          handleCurrencyData={(data) =>
            handleCurrencyDataChange(editFormData?.sections.length - 1, data)
          }
        />
      </Modal>
      <Modal show={showPreviewModal} onHide={handlePClose} size="xl">
        <Preview handleClose={handlePClose} modalData={editFormData} />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default EditQuotePage;
