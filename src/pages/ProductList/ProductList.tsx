import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../Dashboard";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

// import AdminLineCharts from "../Componant"

const ProductList = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [expandedItems, setExpandedItems] = useState<any>([]);

  const ProductListData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/products`, {
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
    ProductListData();
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

   //product details
   const HandleShow = (e: any) => {
    Navigate("/admin/product/details", { state: e });
  };

  //edit product
  const HandleEdit = (e: any) => {
    Navigate("/admin/product/edit", { state: e });
  };

  //delete product
  const HandleDelete = (e: any) => {
    Swal.fire({
      title: "Do you want to Delete this Record?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#DC3741",
      confirmButtonText: "Delete",
    }).then((result: any) => {
      if (result.isConfirmed === true) {
        axios
          .delete(`${process.env.REACT_APP_URL}/products/${e}`, {
            headers: { token: `${localStorage.getItem("Token")}` },
          })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted Sucessfully.",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
              ProductListData();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };


  return (
    <>
      <div className="layout-spacing w-100">
        <div className="breadcrumb-two mb-3 d-flex justify-content-between mb-5">
          <ul className="breadcrumb">
            <Toaster position="top-center" reverseOrder={false} />
            <li className="active">
              <a href="##">
                <h5 className="mb-0 text-white">Products</h5>
              </a>
            </li>
            <li>
              <a href="##">.</a>
            </li>
          </ul>

          <button className="btn btn-primary btn-rounded py-0">
            <div className="d-flex">
              <h5
                className="text-white mb-0"
                onClick={() => Navigate("/admin/product/add")}
              >
                Add Products
              </h5>
            </div>
          </button>
        </div>
        <div className="row">
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
                          <div className="th-content">Sr. No</div>
                        </th>
                        <th>
                          <div className="th-content">Category</div>
                        </th>
                        {/* <th>
                          <div className="th-content">Description</div>
                        </th> */}
                        <th>
                          <div className="th-content">Image</div>
                        </th>
                        <th>
                          <div className="th-content th-heading">Price</div>
                        </th>
                        <th>
                          <div className="th-content">Date</div>
                        </th>
                        <th>
                          <div className="th-content">Action</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <>{console.log(recentAppliedjobs)}</> */}
                      {data.map((item: any, index: number) => (
                        <tr key={index}>
                             <td>
                            <div className="td-content customer-name">
                              {index+1}
                            </div>
                          </td>
                          <td>
                            <div className="td-content customer-name">
                              <img src="/assets/img/90x90.jpg" alt="avatar" />
                              {item.category}
                            </div>
                          </td>
                          {/* <td>
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
                          </td> */}
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
                          <td>
                                <div className="td-content">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => HandleShow(item)}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-eye m-1 view_svg_color"
                                  >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => HandleEdit(item)}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-edit m-1 edit_svg_color"
                                  >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => HandleDelete(item.id)}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-trash m-1 delete_svg_color"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line
                                      x1="10"
                                      y1="11"
                                      x2="10"
                                      y2="17"
                                    ></line>
                                    <line
                                      x1="14"
                                      y1="11"
                                      x2="14"
                                      y2="17"
                                    ></line>
                                  </svg>
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
