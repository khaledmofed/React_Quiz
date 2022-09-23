import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import UserCrud from "../ApiCall/UserCrud";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function AddUser(props) {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formdata, setFormdata] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const initialFormState = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    avatar: "",
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const Params = useParams();
  useEffect(() => {
    if (Params.id) {
      UserCrud.get(Params.id)
        .then((response) => {
          response.status && setFormdata(response?.data?.payload);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      console.log(`wwwwwwwwwwwwwww ${Params.id} wwwwwwwwwwww`);
    } else {
      setFormdata({});
      console.log(`wwwwwwwwwwwwwww trtrtrtrtt wwwwwwwwwwww`);
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    // const recaptchaValue = recaptchaRef.current.getValue();
    // this.props.onSubmit(recaptchaValue);

    if (!formdata.username) {
      setError(true);
      setMessage("username is required");
    } else if (!formdata.first_name) {
      setError(true);
      setMessage("first name is required");
    } else if (!formdata.last_name) {
      setError(true);
      setMessage("last name is required");
    } else if (!formdata.email) {
      setError(true);
      setMessage("Email is required");
    } else if (!formdata.password) {
      setError(true);
      setMessage("password is required");
    } else {
      setError(false);
      setMessage("You added has been success!!!");
      const data = new FormData();
      data.append("username", formdata.username);
      data.append("first_name", formdata.first_name);
      data.append("last_name", formdata.last_name);
      data.append("email", formdata.email);
      data.append("password", formdata.password);
      data.append("avatar", selectedImage);

      return UserCrud.create(data)
        .then((response) => {
          swal({
            title: "Good Job .. Your Added has been success!!!",
            text: "You will be taken to the Users View page if you step on OK",
            icon: "success",
            button: {
              text: "ok!",
            },
            successMode: true,
          }).then((redirect) => {
            if (redirect) {
              navigate("/");
            }
          });
          setMessage(response?.data?.message);
        })
        .catch((erorr) => {
          setError(erorr.response.data.message);
        });
    }
  };

  const handleChange = (event) => {
    setFormdata({
      ...formdata,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleAlerts = () => {
    if (error && message) {
      return <div className="alert alert-danger mt-4">{message}</div>;
    } else if (!error && message) {
      return <div className="alert alert-success mt-4">{message}</div>;
    } else {
      return null;
    }
  };
  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="row py-30">
          <div className="col-8">
            <div className="row">
              <div className="col-12">
                <h5 className="title-section">New User Details</h5>
              </div>
              <div className="col-6">
                <div className="mb-3 input-group">
                  <span className="input-group-text">User Name</span>

                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Your User Name.."
                    onChange={handleChange}
                    value={formdata.username}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3 input-group">
                  <span className="input-group-text">First Name</span>

                  <input
                    className="form-control"
                    type="text"
                    id="fname"
                    name="first_name"
                    placeholder="Your First Name.."
                    onChange={handleChange}
                    value={formdata.first_name}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3 input-group">
                  <span className="input-group-text">Last Name</span>

                  <input
                    className="form-control"
                    type="text"
                    id="lname"
                    name="last_name"
                    placeholder="Your last name.."
                    onChange={handleChange}
                    value={formdata.last_name}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3 input-group">
                  <span className="input-group-text">Password</span>

                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your Password.."
                    onChange={handleChange}
                    value={formdata.password}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3 input-group">
                  <span className="input-group-text">Email</span>

                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email.."
                    onChange={handleChange}
                    value={formdata.email}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="col-12">
              <h5 className="title-section">Profile Picture</h5>
            </div>
            <div className="col-12">
              <div className=""></div>
              <div className="">
                {imageUrl && selectedImage && (
                  <div mt={2} textAlign="center" className="space-image">
                    <img
                      src={imageUrl}
                      alt={selectedImage.name}
                      height="200px"
                    />
                  </div>
                )}

                <input
                  accept="image/*"
                  type="file"
                  id="avatar"
                  name="avatar"
                  style={{ display: "none" }}
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <label htmlFor="avatar" className="lable-avatar">
                  <div
                    variant="contained"
                    color="primary"
                    component="span"
                    className="button-upload-image"
                  >
                    Upload Image
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-75">
            <input
              type="file"
              id="Avatar"
              name="Avatar"
              placeholder="Your Avatar.."
              onChange={handleChange}
              value={formdata.avatar}
            />
          </div> */}
        <div className="row">
          <div className="col-8"></div>
          <div className="col-4 text-right">
            <Link to="/" className="btn btn-secondary mr-3">
              Cancel
            </Link>
            <Button variant="primary" type="submit">
              Add User
            </Button>
          </div>
        </div>
      </form>
      {handleAlerts()}
    </div>
  );
}

export default AddUser;
