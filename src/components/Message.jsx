import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import CryptoJS from "crypto-js";

const Message = ({ message }) => {
  const decryptedText = CryptoJS.AES.decrypt(message.text, "my-secret-key");
  const originalText = decryptedText.toString(CryptoJS.enc.Utf8);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
        ref={ref}
        className={`message ${
          message.senderId === currentUser.uid ? "owner" : ""
        }`}
      >
        <div className="messageInfo">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
          <span>just now</span>
        </div>
        <div className="messageContent">
          <p>{originalText}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
      </div>
    </>
  );
};

export default Message;
