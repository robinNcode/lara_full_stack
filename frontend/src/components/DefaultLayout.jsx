import {Navigate, Link, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import React from "react";

function onLogOut(evt) {
  evt.preventDefault();
}

export default function () {
  const {currentUser, token} = useStateContext();

  if (!token) {
    return <Navigate to={"/signin"}/>;
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
