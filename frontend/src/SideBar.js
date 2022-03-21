import React, { useContext } from "react";
import { Link} from "react-router-dom";
import "./Home.css";
import { roleContext } from "./Context";

function SideBar(props) {
  const role = useContext(roleContext);

  const setLinks = () => {
    if (role === "Manager") {
      return (
        <p>
          <Link
            to="/Info"
            id="link"
            state={{
              role: role,
              email: props.email,
              totalForms: props.totalForms,
            }}
          >
            Info
          </Link>
        </p>
      );
    } else if (role === "V.P." || role === "Marketing") {
      return (
        <p>
          <Link
            to="/Report"
            id="link"
            state={{
              role: role,
              email: props.email,
              totalForms: props.totalForms,
            }}
          >
            Report
          </Link>
        </p>
      );
    } else if (role === "Admin") {
      return (
        <div>
          <p>
            <Link
              to="/Info"
              id="link"
              state={{
                role: role,
                email: props.email,
                totalForms: props.totalForms,
              }}
            >
              Info
            </Link>
          </p>
          <p>
            <Link
              to="/Report"
              id="link"
              state={{
                role: role,
                email: props.email,
                totalForms: props.totalForms,
              }}
            >
              Report
            </Link>
          </p>
          <p>
            <Link
              to="/User"
              id="link"
              state={{
                role: role,
                email: props.email,
                totalForms: props.totalForms,
              }}
            >
              Users
            </Link>
          </p>
        </div>
      );
    }
  };

  return (
    <div>
      <p className="heading">You can click on links below to jump onto page</p>
      <div className="sidebar_options">
        <p>
          <Link
            to="/Home"
            id="link"
            state={{
              role: role,
              email: props.email,
              totalForms: props.totalForms,
            }}
          >
            Home
          </Link>
        </p>
        {setLinks()}
      </div>
    </div>
  );
}

export default SideBar;
