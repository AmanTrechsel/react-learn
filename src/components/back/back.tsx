import React from "react";
import "./back.css";

const { default: backSvg } = require("../../assets/back.svg") as { default: string };

export default function Back() {
  return (
    <button className="back" type="button">
      <img src={backSvg} alt="Back button" />
    </button>
  );
}
