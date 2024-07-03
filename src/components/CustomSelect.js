import React, { useState } from "react";
import usd from "../images/usd.svg";
import ngn from "../images/ngn.svg";

const CustomSelect = ({ options, onChange, value, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"  // Set button type to "button"
        disabled={disabled}
        className="w-full border rounded p-2 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <img
            className="rounded-sm h-[14px]"
            src={value === "USD" ? usd : ngn}
            alt="currency"
          />
          <div className="pl-[10px]">{value}</div>
        </div>
        <span className="ml-2">
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </span>
      </button>
      {isOpen && (
        <div
          className="absolute border rounded bg-white mt-1"
          style={{ zIndex: "9999" }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 flex items-center cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              <img
                src={option.image}
                alt={option.value}
                className="h-[14px] w-[14px] mr-2"
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
