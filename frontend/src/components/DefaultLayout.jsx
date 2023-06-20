import {Navigate, Link, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import React, {useEffect} from "react";
import axiosClient from "../axios_client.js";

export default function () {
  const {currentUser, token, setCurrentUser, setToken} = useStateContext();

  if (!token) {
    return <Navigate to={"/signin"}/>;
  }

  /**
   * To get the current user information ...
   */
  useEffect(() => {
    axiosClient.get("/user")
      .then((result) => {
        if (result.data.status === "success") {
          setCurrentUser(result.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**
   * This function will be called when the user clicks on the logout button.
   * @param e
   */
  function onLogOut(e) {
    e.preventDefault();

    axiosClient.post("/logout")
      .then((result) => {
        if (result.data.status === "success") {
          setToken(null);
          localStorage.removeItem("ACCESS_TOKEN");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="defaultLayout">
      <aside>
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/users"}>Users</Link>
      </aside>
      <div className={"content"}>
        <header>
          <div>Header</div>
          <div>
            {currentUser.name}
            <a href="#" onClick={onLogOut} className={"btn-logout"}>Logout</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  );
}
