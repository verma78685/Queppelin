import React, { useEffect, useState } from "react";
import logo from "./queppelin-logo3.png";
import "./Home.css";
import SideBar from "./SideBar";
import { roleContext } from "./Context";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");

  const location = useLocation();
  const [role, setRole] = useState("User");
  const [link, setLink] = useState("User");
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLink(role);
    const body = { role: role, email: email, name: name, mob: mob };
    console.log(body);
    axios
      .post("http://localhost:3000/role/setDetails", body)
      .then((res) => {
        console.log(res);
      })
      .catch();
  };

  // console.log(location.state.role);

  useEffect(() => {
    console.log(location.state);
    if (location.state.role !== undefined) {
      setRole(location.state.role);
    }
  }, []);

  useEffect(() => {
    if (location.state !== null) {
      setEmail(location.state.email);
      // setRole(location.state.role);
    }
  }, []);

  useEffect(() => {
    if (email !== "") {
      axios
        .get("http://localhost:3000/role/getRole", { params: { email: email } })
        .then((res) => {
          console.log(res.data[0].role);
          setLink(res.data[0].role);
          setRole(res.data[0].role);
          setName(res.data[0].name);
          setMob(res.data[0].mob);
        })
        .catch((err) => console.log(err));
    }
  }, [email]);

  return (
    <div>
      <nav className="navbar navbar-light home_navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div
            className="name_div"
            style={{
              marginRight: "30px",
              textAlign: "center",
            }}
          >
            <i
              className="fa fa-circle"
              style={{ fontSize: "35px", color: "#3492a8" }}
            ></i>
            <span className="name">{email} Account</span>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-sm-2 sidebar">
            <roleContext.Provider value={link}>
              <SideBar email={email} totalForms={location.state.totalForms} />
            </roleContext.Provider>
          </div>
          <div className="col-sm-10 details_bar">
            <div className="form_heading align-items-center">
              <span className="form_submission">Form Submission</span>
              <span className="total_form_submitted">
                Total Form Submitted: {location.state.totalForms}
              </span>
            </div>
            <div className="details_form">
              <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label className="control-label col-sm-2" htmlFor="name">
                    Name
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="name"
                      placeholder="Kellogs"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="control-label col-sm-2" htmlFor="mob">
                    Mobile No.
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="tel"
                      value={mob}
                      onChange={(e) => setMob(e.target.value)}
                      className="form-control"
                      id="mob"
                      placeholder="91 - 0123456789"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="control-label col-sm-2" htmlFor="role">
                    Role
                  </label>
                  <div className="col-sm-5">
                    <select value={role} onChange={handleChange}>
                      <option value="User">User</option>
                      <option value="Manager">Manager</option>
                      <option value="V.P.">V.P.</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="form-group submit">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button
                      type="submit"
                      className="btn btn-primary submit_btn"
                      style={{}}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
