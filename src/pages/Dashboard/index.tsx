import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import AdminLineCharts from "../Componant"

const AdminDashboard = () => {
  const Navigate = useNavigate();
  const [productList, setProductList] = useState<any>([]);
  const [usersList, setUsersList] = useState<any>([]);
  const productListLength = productList.length;
  const usersListLength = usersList.length;

  const [candidateCount, setCandidateCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [appliedJobCount, setAppliedJobCount] = useState(0);

  const productListData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/products`, {
        headers: { token: `${localStorage.getItem("Token")}` },
      })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
            setProductList(res.data);
        }
      })
      .catch((err) => {
        if (err.response.data.msg === "Unauthorized!") {
          localStorage.clear();
          Navigate("/admin/login");
        } else {
          //   setApierror1(err.response.data.msg);
        }
      });
  };

  const usersListData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/users`, {
        headers: { token: `${localStorage.getItem("Token")}` },
      })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
            setUsersList(res.data);
        }
      })
      .catch((err) => {
        if (err.response.data.msg === "Unauthorized!") {
          localStorage.clear();
          Navigate("/admin/login");
        } else {
          //   setApierror1(err.response.data.msg);
        }
      });
  };

  useEffect(() => {
    productListData();
    usersListData()
  }, []);

  return (
    <>
      <div className="layout-spacing w-100">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <a href="/admin/product">
              <div className="widget widget-one_hybrid widget-engagement mt-4">
                <div className="widget-heading">
                  <div className="w-icon">
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
                      className="feather feather-user-check"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <polyline points="17 11 19 13 23 9"></polyline>
                    </svg>
                  </div>
                  <p className="w-value">{productListLength}</p>
                  <h5>Products</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
          <a href="/admin/users">
            <div className="widget widget-one_hybrid widget-followers mt-4">
              <div className="widget-heading">
                <div className="w-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-users"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx={9} cy={7} r={4} />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p className="w-value">{usersListLength}</p>
                <h5>Users</h5>
              </div>
            </div>
            </a>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <div className="widget widget-one_hybrid widget-referral mt-4">
              <div className="widget-heading">
                <div className="w-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M28 8.25h-4.25v-3.25c-0.002-1.518-1.232-2.748-2.75-2.75h-10c-1.518 0.002-2.748 1.232-2.75 2.75v3.25h-4.25c-1.518 0.002-2.748 1.232-2.75 2.75v16c0.002 1.518 1.232 2.748 2.75 2.75h24c1.518-0.002 2.748-1.232 2.75-2.75v-16c-0.002-1.518-1.232-2.748-2.75-2.75h-0zM9.75 5c0.001-0.69 0.56-1.249 1.25-1.25h10c0.69 0.001 1.249 0.56 1.25 1.25v3.25h-12.5zM29.25 27c-0.001 0.69-0.56 1.249-1.25 1.25h-24c-0.69-0.001-1.249-0.56-1.25-1.25v-16c0.001-0.69 0.56-1.249 1.25-1.25h24c0.69 0.001 1.249 0.56 1.25 1.25v0z"></path>
                  </svg>
                </div>
                <p className="w-value">{jobCount}</p>
                <h5>Jobs</h5>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <div className="widget widget-one_hybrid widget-social mt-4">
              <div className="widget-heading">
                <div className="w-icon">
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
                    className="feather feather-user-check"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <polyline points="17 11 19 13 23 9"></polyline>
                  </svg>
                </div>
                <p className="w-value">{appliedJobCount}</p>
                <h5>Applied Jobs</h5>
              </div>
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="widget widget-chart-one my-4">
              {/* <div className="widget-heading">
                      <h5>Candidates</h5>
                  </div> */}

              <div className="widget-content">
                {/* <AdminLineCharts data={employerMonthChart} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
