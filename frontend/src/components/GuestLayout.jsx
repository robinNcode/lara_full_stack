import {Outlet} from "react-router-dom";

export default function GuestLayout() {
  return (
    <>
      <h1>For Guest users only</h1>
      <Outlet />
    </>
  );
}
