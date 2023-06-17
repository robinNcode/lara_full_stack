import React from "react";

export default function Signup() {
  function onSubmit(evt) {
    evt.preventDefault();
    return undefined;
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className={"title"}>Awesome to see you!</h1>
      <input type={"text"} name={"name"} placeholder={"Full Name"}/>
      <input type={"email"} name={"email"} placeholder={"Email"}/>
      <input type={"password"} name={"password"} placeholder={"Password"}/>
      <input type={"password"} name={"password"} placeholder={"Confirm Password"}/>

      <button className={"btn btn-block"}>Sign Up</button>

      <p className={"message"}>
        Already registered? <a href={"/signin"}>Sign in</a>
      </p>
    </form>
  );
}
