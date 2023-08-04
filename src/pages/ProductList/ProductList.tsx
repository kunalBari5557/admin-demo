import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../Dashboard";
// import AdminLineCharts from "../Componant"

const ProductList = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [expandedItems, setExpandedItems] = useState<any>([]);

  const dashboard = () => {
    axios
      .get(`${process.env.REACT_APP_URL}products`, {
        headers: { token: `${localStorage.getItem("Token")}` },
      })
      .then((res) => {
        console.log(res);

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
            <div className="widget widget-chart-one my-4">
              {/* <div className="widget-heading">
                      <h5>Candidates</h5>
                  </div> */}

              <div className="widget-content">
                {/* <AdminLineCharts data={employerMonthChart} /> */}
              </div>
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="widget widget-table-two">
              <div className="widget-heading">
                <h5>Product List</h5>
              </div>
              <div className="widget-content">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="th-content">Category</div>
                        </th>
                        <th>
                          <div className="th-content">Description</div>
                        </th>
                        <th>
                          <div className="th-content">Image</div>
                        </th>
                        <th>
                          <div className="th-content th-heading">Price</div>
                        </th>
                        <th>
                          <div className="th-content">Date</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <>{console.log(recentAppliedjobs)}</> */}
                      {data.map((item: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <div className="td-content customer-name">
                              <img src="/assets/img/90x90.jpg" alt="avatar" />
                              {item.category}
                            </div>
                          </td>
                          <td>
                            <div className="td-content">
                              {expandedItems.includes(index) ||
                              item.description.length <= 20 ? (
                                item.description
                              ) : (
                                <>
                                  {item.description.slice(0, 20)}...
                                  <a
                                    onClick={() => toggleExpansion(index)}
                                    className="read-more-link"
                                    style={{ color: "blue" }}
                                  >
                                    Read More
                                  </a>
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="td-content product-brand">
                              <img src={item.image} alt="avatar" />
                            </div>
                          </td>
                          <td>
                            <div className="td-content">{item.price}</div>
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

export default ProductList;
