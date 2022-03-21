import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import logo from "./queppelin-logo3.png";
import { roleContext } from "./Context";
import axios from "axios";
import "./Home.css";
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

export default function Report() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/role/getGraphDetails")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch();
  }, []);

  const location = useLocation();
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
              <span className="form_submission">Report Details</span>
              <span className="total_form_submitted">
                Total Form Submitted: {location.state.totalForms}
              </span>
            </div>
            <div className="container-fluid user_table">
              <div className="row">
                <div className="col-sm-5">
                  <Paper>
                    <Chart data={data}>
                      <ArgumentAxis />
                      <ValueAxis />
                      <BarSeries valueField="count" argumentField="_id" />
                      <Title text="User Roles" />
                      <Animation />
                    </Chart>
                  </Paper>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-5">
                  <Paper>
                    <Chart data={data}>
                      <PieSeries valueField="count" argumentField="_id" />
                      <Title text="User Roles" />
                      <Animation />
                    </Chart>
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
