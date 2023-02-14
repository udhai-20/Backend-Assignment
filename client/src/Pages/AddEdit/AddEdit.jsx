import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddEdit.css";
import axios from "axios";

const innitial = {
  name: "",
  email: "",
  contact: "",
};
function AddEdit(props) {
  const navigate = useNavigate();
  const [form, setForm] = useState(innitial);
  const { name, email, contact } = form;
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("please enter the all credentials");
      console.log("error");
    } else {
      if (!id) {
        axios
          .post("http://localhost:8012/api/v1/post", form)
          .then(() => {
            setForm({ ...form, ...innitial });
          })
          .catch((err) => toast.error(err.response.data));
        setTimeout(() => {
          toast.success("contact addded successfully");
          navigate("/");
        }, 500);
      } else {
        axios
          .put(`http://localhost:8012/api/v1/put/${id}`, form)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => toast.error(err.response.data));
        setTimeout(() => {
          toast.success("contact Updated successfully");
          navigate("/");
        }, 500);
      }
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
    console.log(value);
  };
  useEffect(() => {
    axios.get(`http://localhost:8012/api/v1/get/${id}`).then((res) => {
      setForm({ ...res.data[0] });
    });
  }, [id]);
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <form
          style={{
            margin: "auto",
            padding: "10px",
            maxWidth: "60%",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <lable htmlFor="name">Name</lable>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            value={name || ""}
            onChange={handleChange}
          />
          <lable>Email</lable>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={email || ""}
            onChange={handleChange}
          />
          <lable htmlFor="contact">Contact</lable>
          <input
            type="tel"
            id="contact"
            name="contact"
            placeholder="Enter Your Contact"
            value={contact || ""}
            onChange={handleChange}
          />
          <input type="submit" id="submit" value={id ? "Update" : "Save"} />
          <Link to="/">
            <button className="btn-goback">Go Back</button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default AddEdit;
