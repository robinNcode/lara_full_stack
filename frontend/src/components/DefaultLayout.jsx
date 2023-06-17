import {Outlet} from "react-router-dom";

export default function () {
  return (
    <>
      <h1>Default Layout</h1>
      <Outlet />
    </>
  );
}
