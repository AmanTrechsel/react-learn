import Back from "../back/back";

import "./banner.css";

export default function Banner({ text }) {
  return (
    <div className="banner">
      <Back />
      <h1>{text}</h1>
      <div></div>
    </div>
  );
}
