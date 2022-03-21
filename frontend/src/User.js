import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import logo from "./queppelin-logo3.png";
import { roleContext } from "./Context";
import axios from "axios";
import "./Home.css";

export default function User() {
  const [details, setDetails] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/role/getDetails")
      .then((res) => {
        setDetails(res.data);
        // console.log("user");
        // console.log(details);
      })
      .catch();
  }, []);

  return (
    <div style={{ maxHeight: "100%" }}>
      <nav className="navbar navbar-light home_navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div
            className="name_div"
            style={{ marginRight: "30px", textAlign: "center" }}
          >
            <i
              className="fa fa-circle"
              style={{ fontSize: "35px", color: "#3492a8" }}
            ></i>
            <span className="name">{location.state.email} Account</span>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-sm-2 sidebar">
            <roleContext.Provider value={location.state.role}>
              <SideBar
                email={location.state.email}
                totalForms={location.state.totalForms}
              />
            </roleContext.Provider>
          </div>
          <div className="col-sm-10 details_bar">
            <div className="form_heading align-items-center">
              <span className="form_submission">User Details</span>
              <span className="total_form_submitted">
                Total Form Submitted: {location.state.totalForms}
              </span>
            </div>
            <div className="user_table">
              <table className="table table-hover table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((d, i) => (
                    <tr key={i}>
                      <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>{d.mob}</td>
                      <td>{d.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
