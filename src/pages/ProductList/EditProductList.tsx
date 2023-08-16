import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductUpdateSchema } from "../../ValidationSchema";

interface Employer {
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
}

const ProductListEdit = () => {
    const location = useLocation();
    const stateData = location.state;
    const Navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const productsEdit = useFormik<Employer>({
        initialValues: {
            title: stateData.title,
            price: stateData.price,
            description: stateData.description,
            category: stateData.category,
            image: stateData.image,
        },
        enableReinitialize: true,
        validationSchema: ProductUpdateSchema,

        onSubmit: (values: Employer, action: any) => {
            let formData = new FormData();
            formData.append("title", values.title); //append the values with key, value pair
            formData.append("price", values.price); //append the values with key, value pair
            formData.append("description", values.description);
            formData.append("category", values.category);
            formData.append("image", values.image);

            axios
                .put(
                    `${process.env.REACT_APP_URL}/products/${stateData.id}`,
                    formData,
                    { headers: { token: `${localStorage.getItem("Token")}` } }
                )
                .then((res) => {
                    if (res.status === 200) {
                        Navigate("/admin/product", { state: res.data.msg });
                    }
                })
                .catch((err) => {
                    toast.error(err.response.data.msg);
                    // Navigate('/admin/product');
                });
        }
    });

    console.log("productsEdit",productsEdit)
    return (
        <>
            <div className="w-100">
                <div className="breadcrumb-two mb-3 d-flex justify-content-between">
                    <ul className="breadcrumb">
                        <Toaster position="top-center" reverseOrder={false} />
                        <li className="active">
                            <a href="##">
                                <h5 className="mb-0 text-white">Edit Products</h5>
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
                                <form onSubmit={productsEdit.handleSubmit}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Title"
                                            value={productsEdit.values.title}
                                            onChange={productsEdit.handleChange}
                                            onBlur={productsEdit.handleBlur}
                                            name="title"
                                        />
                                    </div>
                                    {productsEdit.errors.title && productsEdit.touched.title ? (
                                        <h6 className="text-danger mt-2 ml-1">
                                            {productsEdit.errors.title}
                                        </h6>
                                    ) : null}

                                    <div className="form-group">
                                        <label>Price</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Price"
                                            value={productsEdit.values.price}
                                            onChange={productsEdit.handleChange}
                                            onBlur={productsEdit.handleBlur}
                                            name="price"
                                        />
                                    </div>
                                    {productsEdit.errors.price && productsEdit.touched.price ? (
                                        <h6 className="text-danger mt-2 ml-1">
                                            {productsEdit.errors.price}
                                        </h6>
                                    ) : null}

                                    <div className="form-group">
                                        <label>Description</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Description"
                                            value={productsEdit.values.description}
                                            onChange={productsEdit.handleChange}
                                            onBlur={productsEdit.handleBlur}
                                            name="description"
                                        />
                                    </div>
                                    {productsEdit.errors.description && productsEdit.touched.description ? (
                                        <h6 className="text-danger mt-2 ml-1">
                                            {productsEdit.errors.description}
                                        </h6>
                                    ) : null}

                                    <div className="form-group">
                                        <label>Category</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Category"
                                            value={productsEdit.values.category}
                                            onChange={productsEdit.handleChange}
                                            onBlur={productsEdit.handleBlur}
                                            name="category"
                                        />
                                    </div>
                                    {productsEdit.errors.category && productsEdit.touched.category ? (
                                        <h6 className="text-danger mt-2 ml-1">
                                            {productsEdit.errors.category}
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
                                                    productsEdit.setFieldValue(
                                                        "image",
                                                        e.target.files && e.target.files[0]
                                                    )
                                                }
                                                onBlur={productsEdit.handleBlur}
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
                                    {productsEdit.errors.image && productsEdit.touched.image ? (
                                        <h6 className="text-danger mt-2 ml-1">
                                            {productsEdit.errors.image}
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

export default ProductListEdit;