import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewProductDetails = () => {
  const location = useLocation();
  const stateData = location.state;

  //Read more functionality
  const maxLength = 30; // Define the maximum length before showing "Read More"
  const initialDescription = stateData.description;
  const [description, setDescription] = useState(initialDescription);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const initialTitle = stateData.title;
  const [title, setTitle] = useState(initialTitle);
  const [showTitle, setShowTitle] = useState(false);

  const toggleTitle = () => {
    setShowTitle(!showTitle);
    setTitle(initialTitle); // Reset description when toggling
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
    setDescription(initialDescription); // Reset description when toggling
  };

  return (
    <>
      <div className="w-100">
        <div className="breadcrumb-two mb-3 d-flex justify-content-between">
          <ul className="breadcrumb">
            <li className="active">
              <a href="##">
                <h5 className="mb-0 text-white">Details Products</h5>
              </a>
            </li>
            <li>
              <a href="##">.</a>
            </li>
          </ul>
        </div>
        <div className="statbox widget box box-shadow">
          <div className="widget-content widget-content-area p-0 box-shadow-none">
            <div className="row col-lg-12 col-12">
              <div className="col-lg-4 col-4">
                <form>
                  <div className="form-group">
                    <label>Title</label>
                  </div>

                  <div className="form-group">
                    <label>Price</label>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                  </div>

                  <div className="form-group">
                    <label>Image</label>
                  </div>

                </form>
              </div>
              <div className="col-lg-4 col-4">
                <form>
                  <div className="form-group">
                  <label>
        {showTitle ? title : title.slice(0, maxLength)}
        {title.length > maxLength && !showTitle && (
          <span>
            ...{' '}
            <a style={{ color: "blue",cursor: "pointer" }} onClick={toggleTitle}>Read More</a>
          </span>
        )}
      </label>                      </div>

                  <div className="form-group">
                    <label>{stateData.price}</label>
                  </div>

                  <div className="form-group">
                  <label>
        {showFullDescription ? description : description.slice(0, maxLength)}
        {description.length > maxLength && !showFullDescription && (
          <span>
            ...{' '}
            <a style={{ color: "blue",cursor: "pointer" }} onClick={toggleDescription}>Read More</a>
          </span>
        )}
      </label>                  </div>

                  <div className="form-group">
                    <label>{stateData.category}</label>
                  </div>

                  <div className="form-group">
                    <img src={stateData.image} height="100" width="100"/>
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

export default ViewProductDetails;