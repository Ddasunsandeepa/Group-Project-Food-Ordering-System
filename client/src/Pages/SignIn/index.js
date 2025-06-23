import React, { useContext, useEffect, useState } from "react";
import { Mycontext } from "../../context/MyContext";
import logo from "../../assets/images/images.png";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../assets/google-icon-2048x2048-pks9lbdv.png";
import { postData } from "../../utils/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { fireBase } from "../../firebase";

const auth = getAuth(fireBase);
const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
  const [loading, setLoading] = useState(false); // New loading state
  const context = useContext(Mycontext);
  const history = useNavigate();
  const onchangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  // useEffect(() => {
  //   context.setIsHeaderFooterShow(false);
  // }, []);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

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
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("🎉 Logged in successfully!", {
        theme: "colored",
        position: "bottom-left",
      });

      setTimeout(() => {
        history("/");
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
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const fields = {
          name: user.providerData[0].displayName,
          phone: user.providerData[0].phoneNumber,
          email: user.providerData[0].email,
          password: null,
          isAdmin: false,
        };
        console.log("Posting data to backend:", fields);

        postData("/api/user/authWithGoogle", fields).then((res) => {
          try {
            if (res.error !== true) {
              localStorage.setItem("token", res.token);
              localStorage.setItem("user", JSON.stringify(res.user));
              const user = {
                name: res.user.name,
                email: res.user.email,
                userId: res.user?.id,
              };
              toast.success("🎉 Logged in successfully!", {
                theme: "colored",
                position: "bottom-left",
              });
              setTimeout(() => {
                history("/");
                window.location.href = "/";
              }, 2000);
            } else {
              toast.success(" Logged in successfully!", {
                theme: "colored",
                position: "bottom-left",
              });
            }
          } catch (error) {
            console.log(error);
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error("❌ Failed to log in. Please try again!", {
          theme: "colored",
          position: "bottom-left",
        });
      });
  };
  return (
    <>
      <ToastContainer position="bottom-left" autoClose={3000} />

      <section className="section signInPage">
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

            <form className="mt-0" onSubmit={signIn}>
              <h2 style={{ color: "black" }} className="ml-3 mb-3">
                Sign In
              </h2>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  type="email"
                  required
                  className="w-100"
                  name="email"
                  onChange={onchangeInput}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  type="password"
                  required
                  className="w-100"
                  name="password"
                  onChange={onchangeInput}
                />
              </div>
              <a className="border-effect txt">Forget Password?</a>
              <div className="d-flex align-items-center mt-2 mb-2 ">
                <Button
                  type="submit"
                  className="btn-blue col btn-lg btn-big"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Link to="/">
                  <Button
                    className="btn-lg btn-big col ml-2"
                    variant="outlined"
                    // onClick={() => context.setIsHeaderFooterShow(true)}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
              <p className="txt">
                Not Registered?{" "}
                <Link to="/SignUp" className="border-effect">
                  Sign Up
                </Link>
              </p>
              <h6 className="mt-4 text-center font-weight-bold">
                Or continue wih social account
              </h6>
              <Button
                className="logiGoogle mt-2"
                variant="outlined"
                onClick={signInWithGoogle}
              >
                <img
                  style={{ height: "50px", width: "50px" }}
                  src={logo1}
                  alt=""
                />
                Sign In With Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
