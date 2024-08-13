import backSvg from "../../../assets/back.svg";
import "./back.css";

export default function Back() {
  return (
    <button className="back" type="button">
      <img src={backSvg} alt="back-button" />
    </button>
  );
}
