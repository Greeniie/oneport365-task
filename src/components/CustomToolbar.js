import React from "react";

const CustomToolbar = ({ label, onNavigate, onView }) => {
  // Extract the year from the label
  const year = label.split(' ').pop();

  return (
    <div className="rbc-toolbar">
      <span>
        <div className="toolbar-header">All Existing Quotes</div>
        <div className="toolbar-sub">View all created quotes</div>
      </span>
      <span className="rbc-toolbar-label">
        {label.replace(year, '')}
        <span style={{ color: 'rgba(0, 134, 30, 1)' }}>{year}</span> {/* Change color of the year */}
      </span>
      <span className="rbc-btn-group">
        <button style={{border: 'none'}} type="button" onClick={() => onNavigate("PREV")}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button style={{border: 'none'}} type="button" onClick={() => onNavigate("NEXT")}>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </span>
    </div>
  );
};

export default CustomToolbar;
