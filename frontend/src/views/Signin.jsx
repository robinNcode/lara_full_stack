import React from "react";

export default function Signin() {
  function onSubmit(evt) {
    evt.preventDefault();
    return undefined;
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className={"title"}>Sign into your awesome App!</h1>
      <input type={"email"} name={"email"} placeholder={"Email"}/>
      <input type={"password"} name={"password"} placeholder={"Password"}/>
      <button className={"btn btn-block"}>Sign In</button>

      <p className={"message"}>
        Not registered? <a href={"/signup"}>Create an account</a>
      </p>
    </form>
  );
}
