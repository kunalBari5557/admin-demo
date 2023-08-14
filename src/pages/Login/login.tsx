// import { useFormik } from 'formik';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminLoginSchema } from "../../ValidationSchema/index";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

const AdminLogin = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  let is_alert = false;

  useEffect(() => {
    // return()=>{
    if (location.state !== null) {
      if (is_alert === false) {
        toast.success(location.state);
      }

      is_alert = true;
    }
    window.history.replaceState({}, location.state);

    // }
  }, []);

  interface Login {
    username: string;
    password: string;
  }

  const [initialValues] = useState<Login>({ username: "", password: "" });

  const login = useFormik({
    initialValues,
    validationSchema: AdminLoginSchema,

    onSubmit: (values: Login, action: any) => {
      axios
        .post(`${process.env.REACT_APP_URL}/auth/login`, values)
        .then((res) => {
          console.log("res", res);

          if (res.status === 200) {
            toast.success(res.data.message)
            localStorage.setItem("Token", res.data.token);
            localStorage.setItem("is_loading", "true");
            Navigate("/admin/dashboard");
          }
        })
        .catch((err) => {
          console.log("err",err);
          toast.error(err.response.data.message);
        });
    },
  });

  useEffect(() => {
    // Create a new <link> element
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.type = "text/css";
    linkElement.href =
      window.location.origin + "/assets/css/authentication/form-2.css";

    // Append the <link> element to the <head> tag
    document.head.appendChild(linkElement);

    // Clean up the <link> element when the component unmounts
    return () => {
      document.head.removeChild(linkElement);
    };
  }, [location]);

  return (
    <div className="form-container outer">
      <div className="form-form">
        <div className="form-form-wrap">
          <div className="form-container">
            <div className="form-content">
              <Toaster position="top-center" reverseOrder={false} />
              <h1 className="">Admin</h1>
              <p className="">Log in to your account to continue.</p>

              <form className="text-left" onSubmit={login.handleSubmit}>
                <div className="form">
                  <div id="username-field" className="field-wrapper input">
                    <label htmlFor="username">username</label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      id="username"
                      name="username"
                      value={login.values.username}
                      onChange={login.handleChange}
                      onBlur={login.handleBlur}
                      type="text"
                      className="form-control"
                      placeholder="Enter username"
                    />
                  </div>
                  {login.errors.username && login.touched.username ? (
                    <h6 className="text-danger mt-2 ml-1">
                      {login.errors.username}
                    </h6>
                  ) : null}

                  <div id="password-field" className="field-wrapper input mb-2">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="password">PASSWORD</label>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-lock"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                      value={login.values.password}
                      onChange={login.handleChange}
                      onBlur={login.handleBlur}
                      placeholder="Enter Password"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      id="toggle-password"
                      className="feather feather-eye"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  {login.errors.password && login.touched.password ? (
                    <h6 className="text-danger mt-2 ml-1">
                      {login.errors.password}
                    </h6>
                  ) : null}
                  <div className="d-sm-flex justify-content-between">
                    <div className="field-wrapper">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        value=""
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
