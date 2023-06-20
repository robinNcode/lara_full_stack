import {useEffect, useState} from "react";
import axios from "axios";
import axiosClient from "../axios_client.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get("/users")
      .then((response) => {
        setLoading(false);
        setUsers(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

  }

  function editUser() {
    return undefined;
  }

  function deleteUser() {
    return undefined;
  }

  return (
    <>
      <h1>Users</h1>
      {loading && <h1>Loading...</h1>}
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Joined at</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.created_at}</td>
            <td>
              <button className={"btn btn-edit"} onClick={editUser(user.id)}>Edit</button>
              <button className={"btn btn-delete"} onClick={deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
);
}
