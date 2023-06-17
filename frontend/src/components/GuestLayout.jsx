import {Outlet} from "react-router-dom";

export default function GuestLayout() {
  return (
    <>
      <Outlet />
      <h1>For Guest users only</h1>
    </>
  );
}
