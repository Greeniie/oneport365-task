import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const QuoteTableForm = ({ onQuoteDataChange }) => {
  const [sectionName, setSectionName] = useState("");
  const [rows, setRows] = useState([
    { basis: "", unit_of_measurement: "", unit: "", rate: "", amount: "" },
  ]);

  const handleSectionNameChange = (e) => {
    setSectionName(e.target.value);
  };

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { basis: "", unit_of_measurement: "", unit: "", rate: "", amount: "" },
    ]);
  };

  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const inputStyle = {
    outline: "none",
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "4px",
  };

  const inputFocusStyle = {
    outline: "none",
    border: "1px solid #66afe9",
    boxShadow: "0 0 8px rgba(102, 175, 233, 0.6)",
  };

  useEffect(() => {
    onQuoteDataChange({
      section_name: sectionName,
      section_data: rows
    });
  }, [sectionName, rows]);

  return (
    <div>
      <Form.Group controlId="formBasicAddress">
        <Form.Control
          className="create-form"
          type="text"
          name="section_name"
          placeholder="Enter Section Label"
          value={sectionName}
          onChange={handleSectionNameChange}
        />
      </Form.Group>
      <table
        className="qtf relative"
        style={{ border: "1px solid rgba(243, 244, 246, 1)" }}
      >
        <thead className="bg-[#F9FAFB]">
          <tr>
            <th style={{ width: "200px" }}>
              <span className="pl-[15px]">Basis</span>
            </th>
            <th style={{ width: "200px" }}>Unit of Measurement</th>
            <th style={{ width: "200px" }}>Unit</th>
            <th style={{ width: "200px" }}>
              Rate{" "}
              <span className="bg-[#E5E7EB] py-[4px] px-[8px] rounded-sm">
                USD
              </span>
            </th>
            <th style={{ width: "200px" }}>
              Amount{" "}
              <span className="bg-[#E5E7EB] py-[4px] px-[8px] rounded-sm">
                USD
              </span>
            </th>
            <th style={{ width: "100px" }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.basis}
                  onChange={(e) => handleChange(index, "basis", e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style = inputFocusStyle)}
                  onBlur={(e) => (e.target.style = inputStyle)}
                  className="custom-input"
                  placeholder="Enter basis"
                />
              </td>
              <td>
                <select
                  value={row.unit_of_measurement}
                  onChange={(e) =>
                    handleChange(index, "unit_of_measurement", e.target.value)
                  }
                  style={inputStyle}
                  onFocus={(e) => (e.target.style = inputFocusStyle)}
                  onBlur={(e) => (e.target.style = inputStyle)}
                  className="custom-input"
                >
                  <option value="">Select Unit</option>
                  <option value="litres">Litres</option>
                  <option value="kilograms">Kilograms</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={row.unit}
                  onChange={(e) => handleChange(index, "unit", e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style = inputFocusStyle)}
                  onBlur={(e) => (e.target.style = inputStyle)}
                  className="custom-input"
                  placeholder="Enter unit"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.rate}
                  onChange={(e) => handleChange(index, "rate", e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style = inputFocusStyle)}
                  onBlur={(e) => (e.target.style = inputStyle)}
                  className="custom-input"
                  placeholder="Enter rate"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.amount}
                  onChange={(e) =>
                    handleChange(index, "amount", e.target.value)
                  }
                  style={inputStyle}
                  onFocus={(e) => (e.target.style = inputFocusStyle)}
                  onBlur={(e) => (e.target.style = inputStyle)}
                  className="custom-input"
                  placeholder="Enter Amount"
                />
              </td>
              {index > 0 && (
                <div className="absolute bottom-[85px] right-[40px]">
                  <i
                    onClick={() => removeRow(index)}
                    class="fa fa-trash text-[#E11435]"
                    aria-hidden="true"
                  ></i>
                </div>
              )}
            </tr>
          ))}
          <tr>
            <td colSpan="6">
              <button
                type="button"
                onClick={addRow}
                className="add bg-[#fff] pl-[10px] text-[#00861E]"
              >
                <i
                  className="fa fa-plus-square pr-[5px]"
                  aria-hidden="true"
                ></i>{" "}
                Add new basis
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuoteTableForm;
