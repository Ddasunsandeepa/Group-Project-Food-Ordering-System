import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/906343.png";
import { Mycontext } from "../../context/MyContext";
import { MdEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import goo from "../../assets/images/google-icon-2048x2048-pks9lbdv.png";
import { postData } from "../../utils/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Login = () => {
  const [loading, setLoading] = useState(false); // New loading state
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setisShowPassword] = useState(false);
  const context = useContext(Mycontext);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    isAdmin: true,
  });
  const history = useNavigate();
  const onchangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
  }, []);

  const focusInput = (index) => {
    setInputIndex(index);
  };
  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading
    console.log("🛠️ Starting sign-in process...");

    if (formFields.email === "") {
      toast.error("📧 Oops! Email cannot be blank.", {
        theme: "colored",
        position: "bottom-left",
      });
      setLoading(false); // Stop loading
      return;
    }

    if (formFields.password === "") {
      toast.error("🔒 Password is required to log in.", {
        theme: "colored",
      });
      setLoading(false); // Stop loading
      return;
    }

    console.log("📤 Sending login request with:", formFields);

    try {
      const res = await postData("/api/user/signin", formFields);

      console.log("📥 API Response in signIn:", res);

      if (!res || res.status === false) {
        setLoading(false);
        // ✅ Fix: Handle null response properly
        console.log("🚨 Login failed:", res?.msg);

        if (res?.msg === "User not found!") {
          console.log("🔎 Debug: User not found!");
          toast.error("⚠️ No account found with this email.", {
            theme: "colored",
          });
        } else if (res?.msg === "Invalid credentials") {
          console.log("🔎 Debug: Invalid credentials!");
          toast.error("🚨 Incorrect email or password!", {
            theme: "colored",
            position: "bottom-left",
          });
        } else {
          console.log("🔎 Debug: Unknown error!");
          toast.error("❌ Something went wrong! Please try again.", {
            theme: "colored",
            position: "bottom-left",
          });
          setLoading(false); // Stop loading
        }
        return;
      }

      // ✅ Successful login
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("🎉 Logged in successfully!", {
        theme: "colored",
        position: "bottom-left",
      });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      console.error("🛑 Error during sign-in:", error);
      toast.error("❌ Network error! Please try again.", {
        theme: "colored",
      });
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  return (
    <>
      <ToastContainer position="bottom-left" autoClose={3000} />
      <img
        src="https://dashboard-ecommerce-react.netlify.app/static/media/pattern.df9a7a28fc13484d1013.webp"
        alt=""
        className="pattern"
      />
      <section className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={logo} alt="" width="180px" className="logo-img" />
            <h3 className="font-weight-bold" style={{ fontWeight: "700" }}>
              Login to Dashboard
            </h3>
          </div>
          <div className="wrapper mt-4 card border">
            <form onSubmit={signIn}>
              <div
                className={`form-group mb-3 position-relative ${
                  inputIndex === 0 && "focus"
                }`}
              >
                <span className="icon">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Email"
                  onFocus={() => focusInput(0)}
                  onBlur={() => setInputIndex(null)}
                  autoFocus
                  name="email"
                  onChange={onchangeInput}
                />
              </div>
              <div
                className={`form-group mb-4 position-relative ${
                  inputIndex === 1 && "focus"
                }`}
              >
                <span className="icon">
                  <TbPasswordFingerprint />
                </span>
                <input
                  type={`${isShowPassword === true ? "text" : "password"}`}
                  className="form-control"
                  placeholder="Enter your Password"
                  onFocus={() => focusInput(1)}
                  onBlur={() => setInputIndex(null)}
                  name="password"
                  onChange={onchangeInput}
                />
                <span
                  className="toglleShowPassword"
                  onClick={() => setisShowPassword(!isShowPassword)}
                >
                  {isShowPassword === true ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="form-group">
                <Button
                  type="submit"
                  className="btn-blue btn-lg btn-big w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
              <div className="form-group mt-3 text-center mb-0">
                <Link to={"/forgot-passowrd"} className="link">
                  FORGOT PASSOWRD
                </Link>
                <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                  <span className="line"></span>
                  <span className="txt">or</span>
                  <span className="line"></span>
                </div>
                <Button
                  variant="outlined"
                  className="w-100 btn-lg btn-big loginWithGoogle mb-3"
                >
                  <img
                    src={goo}
                    alt=""
                    style={{ height: "30px", width: "30px" }}
                  />{" "}
                  &nbsp; Sign In With Google
                </Button>
                {/* <Button
                  variant="outlined"
                  className="w-100 btn-lg btn-big loginWithGoogle mb-3"
                >
                  <img
                    src={goo}
                    alt=""
                    style={{ height: "30px", width: "30px" }}
                  />{" "}
                  &nbsp; Sign In With Google
                </Button> */}
              </div>
            </form>
          </div>
          <div className="wrapper mt-3 card border p-2">
            <span className="text-center">
              Don't have an account?
              <Link to={"/signUp"} className="link color ml-2">
                Register
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
