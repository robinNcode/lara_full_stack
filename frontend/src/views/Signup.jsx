import React, { useRef, useState} from "react";
import axiosClient from "../axios_client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const {setCurrentUser, setToken} = useStateContext();

  /**
   * to set response
   */
  const [errors, setErrors] = useState(null);

  /**
   * This function will be called when the user submits the form.
   * @param e
   */
  function onSubmit(e) {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value
    }

    axiosClient.post("/register", payload)
      .then((result) => {
        /**
         * If the user is successfully created, we will set the current user and token
         * automatically redirect to the home page ...
         */
        setCurrentUser(result.data.data.user);
        setToken(result.data.data.token);
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
      <h1 className={"title"}>Awesome to see you!</h1>
      {
        errors &&
        Object.keys(errors).map((key) => {
          return (
            <p key={key} className={"alert"}>{errors[key][0]}</p>
          );
        })
      }
      <input ref={nameRef} type={"text"} name={"name"} placeholder={"Full Name"}/>
      <input ref={emailRef} type={"email"} name={"email"} placeholder={"Email"}/>
      <input ref={passwordRef} type={"password"} name={"password"} placeholder={"Password"}/>
      <input ref={confirmPasswordRef} type={"password"} name={"password"} placeholder={"Confirm Password"}/>

      <button className={"btn btn-block"}>Sign Up</button>

      <p className={"message"}>
        Already registered? <a href={"/signin"}>Sign in</a>
      </p>
    </form>
  );
}
