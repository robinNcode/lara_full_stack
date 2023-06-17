import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function GuestLayout() {
  const {token} = useStateContext();

  if (token) {
    return <Navigate to={"/users"} />;
  }

  return (
    <>
      <h1>For Guest users only</h1>
      <Outlet />
    </>
  );
}
