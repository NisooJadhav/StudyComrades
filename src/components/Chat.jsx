import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideoCamera,
  faAdd,
  faListDots,
} from "@fortawesome/free-solid-svg-icons";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <>
      <div className="chat">
        <div className="chatInfo">
          <span>{data.user.displayName}</span>
          <p className="has-icons-right is-large" align="right">
            <FontAwesomeIcon icon={faVideoCamera} />
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faAdd} />
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faListDots} />
            &nbsp;&nbsp;
          </p>
        </div>
        <Messages />
        <Input />
      </div>
    </>
  );
};

export default Chat;
