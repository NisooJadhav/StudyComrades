import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="level container is-widescreen is-fluid">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="title">StudyComrade</h1>
        <h1 className="title">Log In</h1>
        <hr />
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

        <div className="container level is-widescreen">
          <button className="is-item button is-outlined is-success authButton">
            Sign in
          </button>
          {error && <span>something went wrong</span>}
        </div>
        <Link to="/register">need an account?</Link>
      </form>
    </div>
  );
}
