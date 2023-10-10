import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faLock,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const fileInput = e.target;
    if (fileInput.files.length > 0) {
      setFileName(fileInput.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              displayName,
              email,
              photoURL: downloadURL,
              uid: res.user.uid,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="level container is-widescreen is-fluid">
      <form onSubmit={handleSubmit}>
        <h1 className="title">StudyComrade</h1>
        <h1 className="title">Register</h1>
        <hr />
        <div className="field">
          <label className="label">Name</label>
          <p className="control has-icons-left">
            <input type="text" placeholder="enter name" className="input" />
            <span className="icon is-large is-left">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </p>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <p className="control has-icons-left">
            <input type="email" placeholder="enter email" className="input" />
            <span className="icon is-large is-left">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </p>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <p className="control has-icons-left">
            <input
              type="password"
              placeholder="enter password"
              className="input"
            />
            <span className="icon is-large is-left">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </p>
        </div>
        <br />
        <div className="file has-name">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="profile-pic"
              onChange={handleFileChange}
            />
            <span className="file-cta">
              <span className="file-icon ">
                <FontAwesomeIcon icon={faUpload} />
              </span>
              <span className="file-label">upload profile pic</span>
            </span>
            <span className="file-name">{fileName}</span>
          </label>
        </div>

        <div className="container level is-widescreen">
          <button className="is-item button is-outlined is-success authButton">
            Sign up
          </button>
          {error && <span>something went wrong</span>}
        </div>
        <Link to="/login">already have account?</Link>
      </form>
    </div>
  );
}
