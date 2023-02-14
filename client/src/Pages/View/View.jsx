import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./View.css";
import axios from "axios";
function View(props) {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8012/api/v1/get/${id}`)
      .then((res) => setUser(res.data[0]))
      .catch((err) => console.error(err));
    console.log("   user:", user);
  }, []);
  return (
    <>
      <div style={{ marginTop: "150px" }}>
        <div className="card">
          <div className="card-header">
            <p>User Contact Details</p>
          </div>
          <div className="container">
            <strong>ID:</strong>
            <span>{user.id}</span>
            <br />
            <br />
            <strong>Name:</strong>
            <span>{user.name}</span>
            <br />
            <br />
            <strong>Email:</strong>
            <span>{user.email}</span>
            <br />
            <br />
            <strong>Contact:</strong>
            <span>{user.contact}</span>
            <br />
            <br />
            <Link to={"/"}>
              <div className="btn btn-edit">GO Back</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
