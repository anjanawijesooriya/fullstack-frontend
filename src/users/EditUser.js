import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditUser = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const history = useNavigate();
  const { id } = useParams();

  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/edit/${id}`, user);
      history("/");
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

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
          <h2 className="text-center m-4">Edit User</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                className="form-control"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                className="form-control"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Save Changes
            </button>
            <Link to="/" className="btn btn-outline-danger mx-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
