import { getImage } from "../../utils/getImage";

import "./userIcon.css";

export default function UserIcon({src}: {src: string}) {
   const imgSrc = require("../../assets/users/" + src + ".jpg");

    return (
        <img className="userIcon" src={imgSrc} alt={"User icon " + src} />
    );
}