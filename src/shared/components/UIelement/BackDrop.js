import React from "react";
import ReactDOM from "react-dom";
import "./BackDrop.css";

const BackDrop = props => {
  const content = <div className="back-drop" onClick={props.onClose}></div>;
  return ReactDOM.createPortal(content, document.getElementById("root-drop"));
};

export default BackDrop;
