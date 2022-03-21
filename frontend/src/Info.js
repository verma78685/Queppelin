import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import logo from "./queppelin-logo3.png";
import { roleContext } from "./Context";
import axios from "axios";
import "./Home.css";

export default function Info() {
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
              <span className="form_submission">Info Details</span>
              <span className="total_form_submitted">
                Total Form Submitted: {location.state.totalForms}
              </span>
            </div>
            <div className="user_table">
              <h2>Queppelin - The Metaverse Company</h2>
              Unlock the Metaverse with Queppelin’s end-to-end solutions that
              will enable your business to participate in this landscape today
              and in the future.
              <ul>
                <li>Access the world</li>
                <li>Scale the world</li>
                <li>Change the world</li>
              </ul>
              <br />
              <h2>
                We’re not just trying to define the Metaverse. We’re building
                it.
              </h2>
              <p>
                We are ahead of the competition as we have already laid the
                foundation for the building blocks of Metaverse.
              </p>
              <p>
                Queppelin’s Metaverse Solutions range from boosting digital
                experiences with our AR/VR Services to creating digital items
                (NFTs) using Blockchain Technology. We are here with all the
                tools to help you build your metaverse.
              </p>
              <br />
              <h2>
                Augmented, Virtual Reality & Artificial Intelligence (AR/VR/AI)
                Services
              </h2>
              <p>
                We empower businesses to build the Metaverse by combining
                multiple immersive technologies like Augmented Reality, Virtual
                Reality, and Artificial Intelligence.
              </p>
              <p>
                Queppelin helps businesses bring virtual content and experiences
                into the real world to inspire, explore, and share experiences.
              </p>
              <p>
                We believe that Customer Experience is the next competitive
                battleground for brands and the next-gen technologies our team
                works on make it possible for brands to differentiate
                themselves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
