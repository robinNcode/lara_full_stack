import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function () {
  const {currentUser, token} = useStateContext();

  if (!token) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <>
      <h1>Default Layout</h1>
      <Outlet />
    </>
  );
}
