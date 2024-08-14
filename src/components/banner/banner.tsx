import React from "react";
import Back from "../back/back";

import "./banner.css";

export default function Banner({ text, url, back=true }: { text: string, url?: string, back?: boolean }) {
  function getBackButton() {
    if (back) {
      if (url === undefined) {
        url = "/";
      }
      return ( <Back url={url} /> );
    }
    else {
      return ( <div className="padding"></div> );
    }
  }

  return (
    <div className="banner">
      {getBackButton()}
      <h1>{text}</h1>
      <div className="padding"></div>
    </div>
  );
}
