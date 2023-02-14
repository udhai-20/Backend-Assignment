import React, { useEffect, useState } from "react";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
function Home(props) {
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:8012/api/v1/get");
    setDatas(data);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      axios
        .delete(`http://localhost:8012/api/v1/delete/${id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => toast.error(err.response.data));

      toast.success("content deleted successfully");
      setTimeout(() => {
        fetchData();
      }, 500);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div style={{ margin: "150px" }}>
        <Link to="/add&edit">
          <button className="btn btn-contact">Add Contact</button>
        </Link>
        <table className="styled-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {datas &&
              datas?.length > 0 &&
              datas.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.contact}</td>
                    <td>
                      <Link to={`/edit/${el.id}`}>
                        <button className="btn btn-edit">Edit</button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(el.id)}
                      >
                        Delete
                      </button>
                      <Link to={`/view/${el.id}`}>
                        <button className="btn btn-view">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
