import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import CryptoJS from 'crypto-js';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      const encryptedText = CryptoJS.AES.encrypt(text, 'my-secret-key').toString();

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: encryptedText,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="msgInput">
      <div className="control" style={{ width: "70%" }}>
        <input
          className="input is-medium is-primary"
          type="text"
          placeholder="enter message..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div className="file is-normal">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            name="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          &nbsp;
          <span className="file-cta">
            <span className="file-label">
              <FontAwesomeIcon icon={faPaperclip} />
            </span>
          </span>
        </label>
      </div>
      &nbsp;
      <div className="file is-normal">
        <label className="file-label">
          <input className="file-input" type="file" name="file" />
          <span className="file-cta">
            <span className="file-label">
              <FontAwesomeIcon icon={faImage} />
            </span>
          </span>
        </label>
      </div>
      &nbsp;
      <button
        className="button is-medium"
        style={{ width: "15%" }}
        onClick={handleSend}
      >
        Send &nbsp;
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default Input;