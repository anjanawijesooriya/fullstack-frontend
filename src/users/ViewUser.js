import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ViewUser = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user by id", error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>
          <div className="card">
            <div className="card-header">
              Details of User: {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <b>Username: </b>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <b>E-mail: </b>
                  {user.email}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
