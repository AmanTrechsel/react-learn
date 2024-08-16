import User from "../../classes/user/user";

import "./userIcon.css";

export default function UserIcon({user}: {user: User}) {
   const imgSrc = require("../../assets/users/" + user.getPicture() + ".jpg");

    return (
        <img className="userIcon" src={imgSrc} alt={"User icon " + user.getFullName()} title={user.getFullName()} />
    );
}