import { useNavigate } from "react-router-dom";

import "./back.css";

const { default: backSvg } = require("../../assets/back.svg") as { default: string };

export default function Back({url}: {url: string}) {
  const navigate = useNavigate();
  
  function open() {
    navigate(url)
  }

  return (
    <button className="back" type="button" onClick={open}>
      <img src={backSvg} alt="Back button" />
    </button>
  );
}
