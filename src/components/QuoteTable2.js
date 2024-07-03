import React from "react";

const QuoteTable2 = ({ data }) => {
  const sectionData = data?.sections[1]?.section_data || [];

  // Calculate the sum of amounts
  const totalAmount = sectionData?.reduce((acc, item) => acc + item.amount, 0);

  return (
    <table>
      <thead>
        <tr>
          <th>Basis</th>
          <th>Unit of Measurement</th>
          <th>Unit</th>
          <th>Rate (USD)</th>
          <th>Amount (USD)</th>
        </tr>
      </thead>
      <tbody>
      {sectionData?.map((item) => (
          <tr key={item._id}>
            <td>{item.basis}</td>
            <td>{item.unit_of_measurement}</td>
            <td>{item.unit}</td>
            <td>${item.rate}</td>
            <td>${item.amount}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="3"></td>
          <td className="text-[18px] text-[#9AA1B1]">Subtotal</td>
          <td className="text-[18px]">${totalAmount}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default QuoteTable2;
