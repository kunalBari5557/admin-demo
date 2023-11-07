import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductSchema } from "../../ValidationSchema";
import { Product, createProduct } from "../../Redux/features/products/getAllProducts";
import { useDispatch } from "react-redux";
// import { EmployerUpdateSchema } from '../../../Validation Schema';

interface Employer {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

const AddProduct = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [initialValues, setInitialValues] = useState<Employer>({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const product = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ProductSchema,
  
    onSubmit: (values: Employer) => {
      let formData:any = new FormData();
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("image", values.image);
  
      dispatch(createProduct(formData))
        .then((result:any) => {
          if (createProduct.fulfilled.match(result)) {
            Navigate("/admin/product", { state: result.payload.msg });
          }
        })
        .catch((error:any) => {
          toast.error(error.response.data.msg);
        });
    },
  });
  return (
    <>
      <div className="w-100">
        <div className="breadcrumb-two mb-3 d-flex justify-content-between">
          <ul className="breadcrumb">
            <Toaster position="top-center" reverseOrder={false} />
            <li className="active">
              <a href="##">
                <h5 className="mb-0 text-white">Add Products</h5>
              </a>
            </li>
            <li>
              <a href="##">.</a>
            </li>
          </ul>
        </div>

        <div className="statbox widget box box-shadow">
          <div className="widget-content widget-content-area p-0 box-shadow-none">
            <div className="row">
              <div className="col-lg-6 col-12">
                <form onSubmit={product.handleSubmit}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                      value={product.values.title}
                      onChange={product.handleChange}
                      onBlur={product.handleBlur}
                      name="title"
                    />
                  </div>
                  {product.errors.title && product.touched.title ? (
                    <h6 className="text-danger mt-2 ml-1">
                      {product.errors.title}
                    </h6>
                  ) : null}

                  <div className="form-group">
                    <label>Price</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Price"
                      value={product.values.price}
                      onChange={product.handleChange}
                      onBlur={product.handleBlur}
                      name="price"
                    />
                  </div>
                  {product.errors.price && product.touched.price ? (
                    <h6 className="text-danger mt-2 ml-1">
                      {product.errors.price}
                    </h6>
                  ) : null}

                  <div className="form-group">
                    <label>Description</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                      value={product.values.description}
                      onChange={product.handleChange}
                      onBlur={product.handleBlur}
                      name="description"
                    />
                  </div>
                  {product.errors.description && product.touched.description ? (
                    <h6 className="text-danger mt-2 ml-1">
                      {product.errors.description}
                    </h6>
                  ) : null}

                  <div className="form-group">
                    <label>Category</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Category"
                      value={product.values.category}
                      onChange={product.handleChange}
                      onBlur={product.handleBlur}
                      name="category"
                    />
                  </div>
                  {product.errors.category && product.touched.category ? (
                    <h6 className="text-danger mt-2 ml-1">
                      {product.errors.category}
                    </h6>
                  ) : null}

                  <div className="form-group">
                    <label>Profile</label>
                    <label className="custom-file-container__custom-file mt-0">
                      <input
                        type="file"
                        className="custom-file-container__custom-file__custom-file-input"
                        name="profile"
                        onChange={(e) =>
                          product.setFieldValue(
                            "image",
                            e.target.files && e.target.files[0]
                          )
                        }
                        onBlur={product.handleBlur}
                        accept="image/*"
                      />
                      <span className="custom-file-container__custom-file__custom-file-control outline-none">
                        Choose Profile...
                        <span className="custom-file-container__custom-file__custom-file-control__button">
                          {" "}
                          Browse{" "}
                        </span>
                      </span>
                    </label>
                  </div>

                  {/* <div className="form-group">
                    <label>Profile</label>
                    <label className="custom-file-container__custom-file mt-0">
                      <input
                        type="file"
                        className="custom-file-container__custom-file__custom-file-input"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                      <span className="custom-file-container__custom-file__custom-file-control outline-none">
                        {selectedFile ? selectedFile.name : "Choose Profile..."}
                        <span className="custom-file-container__custom-file__custom-file-control__button">
                          {" "}
                          Browse{" "}
                        </span>
                      </span>
                    </label>
                  </div> */}

                  {product.errors.image && product.touched.image ? (
                    <h6 className="text-danger mt-2 ml-1">
                      {product.errors.image}
                    </h6>
                  ) : null}

                  <div className="form-group mb-1">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;