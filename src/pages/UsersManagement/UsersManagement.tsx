import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../Dashboard";
// import AdminLineCharts from "../Componant"

const UsersManagement = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [expandedItems, setExpandedItems] = useState<any>([]);

  const dashboard = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/users`, {
        headers: { token: `${localStorage.getItem("Token")}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
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
    dashboard();
  }, []);

  const toggleExpansion = (index: any) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(
        expandedItems.filter((itemIndex: any) => itemIndex !== index)
      );
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  return (
    <>
      <div className="layout-spacing w-100">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
           
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="widget widget-table-two">
              <div className="widget-heading">
                <h5>Users Management</h5>
              </div>
              <div className="widget-content">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                      <th>
                          <div className="th-content">Sr. No</div>
                        </th>
                        <th>
                          <div className="th-content">Name</div>
                        </th>
                        <th>
                          <div className="th-content">Username</div>
                        </th>
                        <th>
                          <div className="th-content">Email</div>
                        </th>
                        <th>
                          <div className="th-content th-heading">Phone Number</div>
                        </th>
                        <th>
                          <div className="th-content">Date</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <>{console.log(recentAppliedjobs)}</> */}
                      {data?.map((item: any, index: number) => (
                        <tr key={index}>
                             <td>
                            <div className="td-content customer-name">
                              {index+1}
                            </div>
                          </td>
                          <td>
                            <div className="td-content customer-name">
                              {item.name?.firstname} {item.name?.lastname}
                            </div>
                          </td>
                          <td>
                            <div className="td-content product-brand">
                              {item?.username}
                            </div>
                          </td>
                          <td>
                            <div className="td-content">{item?.email}</div>
                          </td>
                          <td>
                            <div className="td-content">{item?.phone}</div>
                          </td>
                          <td>
                            <div className="td-content pricing">
                              <span>
                                {moment(item.createdAt).format("DD-MM-YYYY")}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersManagement;
