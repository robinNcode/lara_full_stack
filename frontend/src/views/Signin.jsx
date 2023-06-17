import React, {useRef, useState} from "react";
import axiosClient from "../axios_client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {setCurrentUser, setToken} = useStateContext();

  /**
   * To set errors
   */
  const [errors, setErrors] = useState(null);

  function onSubmit(e) {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    /**
     * Send the payload to the backend API
     */
    axiosClient.post("/login", payload)
      .then((result) => {
        /**
         * If the user is successfully created, we will set the current user and token
         * automatically redirect to the home page ...
         */
        console.log(result);
      })
      .catch((err) => {
        const response = err.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className={"title"}>Sign into your awesome App!</h1>

      {
        errors &&
        Object.keys(errors).map((key) => {
          return (
            <p key={key} className={"alert"}>{errors[key][0]}</p>
          );
        })
      }

      <input ref={emailRef} type={"email"} name={"email"} placeholder={"Email"}/>
      <input ref={passwordRef} type={"password"} name={"password"} placeholder={"Password"}/>
      <button className={"btn btn-block"}>Sign In</button>

      <p className={"message"}>
        Not registered? <a href={"/signup"}>Create an account</a>
      </p>
    </form>
  );
}
