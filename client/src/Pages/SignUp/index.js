import React, { useContext, useEffect, useState } from "react";
import { Mycontext } from "../../context/MyContext";
import logo from "../../assets/images/images.png";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../assets/google-icon-2048x2048-pks9lbdv.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postData } from "../../utils/Api";
import { ClipLoader } from "react-spinners"; // Importing ClipLoader spinner

const SignUp = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const context = useContext(Mycontext);
  // useEffect(() => {
  //   context.setIsHeaderFooterShow(false);
  // }, []);
  const [formFields, setFormFields] = useState({
    name: "",
    phone: "",
    password: "",
    isAdmin: false,
  });
  const history = useNavigate();
  const onchangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  const signUp = (e) => {
    e.preventDefault();
    // Show loading spinner
    setLoading(true);

    try {
      if (formFields.name === "") {
        console.log("error");
        toast.error("🚨 Name cannot be blank!", { theme: "colored" });
        setLoading(false);
        return;
      }
      if (formFields.email === "") {
        toast.error("📧 Email cannot be blank!", { theme: "colored" });
        setLoading(false);
        return;
      }
      if (formFields.phone === "") {
        toast.error("📱 Phone number is required!", { theme: "colored" });
        setLoading(false);
        return;
      }
      if (formFields.password === "") {
        toast.error("🔒 Password cannot be blank!", { theme: "colored" });
        setLoading(false);
        return;
      }

      postData("/api/user/signup", formFields)
        .then((res) => {
          console.log("Signup Response:", res); // Debugging log
          setLoading(false);
          if (res && res.status === false) {
            // 🛑 User already exists
            toast.error("⚠️ User already exists! Try logging in.", {
              theme: "colored",
            });
            return;
          }

          if (res) {
            // ✅ Signup successful
            toast.success("✅ Account created successfully!", {
              theme: "colored",
            });
            setLoading(false);
            setTimeout(() => {
              history("/SignIn");
              // window.location.href("/SignIn");
            }, 2000);
          } else {
            // ❌ General error
            toast.error("⚠️ User already exists! Try logging in.", {
              theme: "colored",
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Signup error:", error);
          toast.error("⚠️ User already exists! Try logging in.", {
            theme: "colored",
          });
          setLoading(false);
        });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("❌ Unexpected error occurred!", { theme: "colored" });
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-left" autoClose={3000} />

      <section className="section signInPage signUpPage">
        {/* Background shape */}
        <div className="shape-bottom">
          <svg
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,170.7C672,149,768,107,864,85.3C960,64,1056,64,1152,101.3C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Page content */}
        <div className="container">
          <div className="box card p-3 shadow border-0">
            <div className="text-center">
              <img
                src={logo}
                alt=""
                style={{ height: "100px", width: "300px" }}
              />
            </div>

            <form className="mt-0" onSubmit={signUp}>
              <h2 style={{ color: "black" }} className="ml-3 mb-3">
                Sign Up
              </h2>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      label="Name"
                      variant="standard"
                      type="text"
                      className="w-100"
                      name="name"
                      onChange={onchangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      label="Contact No."
                      variant="standard"
                      type="text"
                      className="w-100"
                      name="phone"
                      onChange={onchangeInput}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      type="email"
                      className="w-100"
                      name="email"
                      onChange={onchangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      id="standard-basic"
                      label="Password"
                      variant="standard"
                      type="password"
                      className="w-100"
                      name="password"
                      onChange={onchangeInput}
                    />
                  </div>
                </div>
              </div>
              <a className="border-effect txt">Forget Password?</a>

              {loading ? (
                <div className="text-center">
                  <ClipLoader loading={loading} size={50} color={"#4f9e8a"} />
                </div>
              ) : (
                <div className="d-flex align-items-center mt-2 mb-2">
                  <div className="row w-100">
                    <div className="col-md-6">
                      <Button
                        type="submit"
                        className="btn-blue w-100 btn-lg btn-big"
                      >
                        Sign Up
                      </Button>
                    </div>
                    <div className="col-md-6 pr-0">
                      <Link to="/SignIn" className="d-block w-100">
                        <Button
                          className="btn-lg btn-big w-100 "
                          variant="outlined"
                          // onClick={() => context.setIsHeaderFooterShow(true)}
                        >
                          Cancel
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <p className="txt">
                Already Registered?{" "}
                <Link to="/SignIn" className="border-effect">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
