import React, { useEffect, useState } from "react";
import logo from "./queppelin-logo2.png";
import "./Login.css";
import axios from "axios";
import Home from "./Home";
import User from "./User";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import obj from "./Details";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [login, isLogin] = useState(false);
  const [register, toRegister] = useState(false);
  const [totalForms, setTotalForms] = useState(0);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    if (email !== "" && pwd !== "") {
      obj.inputEmail(email);
      isLogin(true);
      let body = {
        email: email,
        pwd: pwd,
      };
      // axios
      //   .get("http://localhost:3000/login/getTotalUsers")
      //   .then((res) => {
      //     // console.log(res.data.length);
      //     setTotalForms(res.data.length);
      //   })
      //   .catch();
      axios
        .post("http://localhost:3000/login", body)
        .then((res) => {
          navigate("/Home", {
            state: { email: email, totalForms: totalForms },
          });
        })
        .catch();
    } else {
      console.log("Please Enter Details.");
    }
    e.preventDefault();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/login/getTotalUsers")
      .then((res) => {
        // console.log(res.data.length);
        setTotalForms(res.data.length);
      })
      .catch();
  }, []);

  return (
    <div className="container login" style={{ width: "30%" }}>
      <div
        className="container form"
        style={{
          backgroundColor: "white",
          borderRadius: "4px",
          boxShadow: "0 0 2px #000000",
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <img src={logo} alt="Logo" />
          <h3>Login</h3>
          <hr className="login_hr" />
          <div className="form-group container">
            <input
              type="email"
              value={email}
              className="form-control email"
              placeholder="Enter Email ID"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: "none",
              }}
            />
            <hr style={{ width: "98%", marginTop: "0", marginBottom: "0" }} />
          </div>
          <div className="form-group container">
            <input
              type="password"
              value={pwd}
              className="form-control pwd"
              placeholder="Enter Password"
              onChange={(e) => setPwd(e.target.value)}
              style={{
                border: "none",
              }}
            />
            <hr
              style={{
                width: "98%",
                marginTop: "0",
                marginBottom: "0",
              }}
            />
          </div>
          <div style={{ width: "30%", margin: "auto", paddingTop: "10px" }}>
            <button
              type="submit"
              className="btn btn-primary btn-block login_btn"
              style={{ borderRadius: "10px" }}
            >
              Login
            </button>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <a href="#" style={{ color: "black" }}>
              Forgot Password ?
            </a>
          </div>
          <div style={{ paddingTop: "40px" }}>
            Not a member ?{" "}
            <a href="#" style={{ color: "black" }}>
              Create new account
            </a>
          </div>
          <br />
        </form>
      </div>
      <div style={{ marginTop: "70px" }}>
        <p style={{ color: "#e4dede" }}>Terms & Conditions Privacy Policy</p>
        <p style={{ color: "#e4dede", marginTop: "-15px" }}>
          copyrignt &copy; 2019 Vossle&#174;. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
