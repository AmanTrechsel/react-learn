import React from "react";
import openURL from "../../utils/openURL";

import "./back.css";

const { default: backSvg } = require("../../assets/back.svg") as { default: string };

export default function Back({url}: {url: string}) {
  function open() {
    openURL(url)
  }

  return (
    <button className="back" type="button" onClick={open}>
      <img src={backSvg} alt="Back button" />
    </button>
  );
}
