import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../api/Api";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState, useRef } from "react";
import Auth from "../components/Auth/Auth";
import PasswordInput from "../components/Auth/PasswordField";
import EmailField from "../components/Auth/EmailField";
import GoogleSignInButton from "../components/Auth/GoogleSignInButton";
import AuthActionButton from "../components/Auth/AuthActionButton";
import { Link } from "react-router-dom";
import AuthDivider from "../components/Auth/AuthDivider";
import { User } from "../types";
import { useCart } from "../contexts/CartContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {syncCartOnLogin} = useCart();
  const location = useLocation();

  //set user in use context
  const { setUser } = useUser();

  //navigate
  const navigate = useNavigate();
  const from = (location.state as { from?: string })?.from || "/";

  // Refs for scroll targets
  const emailFormRef = useRef<HTMLDivElement>(null);
  const googleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setError(null);
    setSuccessMsg(null);
  }, [email, password]);

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // Add your forgot password logic here
    alert("Forgot password functionality would be implemented here");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await postData<
        { user: User; token: string },
        { email: string; password: string }
      >("/api/user/signin", { email, password });

      setLoading(false);

      if (response) {
        // Save user info to localStorage
        const user: User = {
          ...response.user,
          token: response.token,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setSuccessMsg("You logged in successfully!");
        
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 500);

        await syncCartOnLogin(user);
        
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1200);
      } else {
        setError("Invalid credentials or server error.");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong.");
      console.error("Sign-in error:", err);
    }
  };

  const handleEmailFieldClick = () => {
    // Scroll to position the Google button at the top and email form in center
    if (emailFormRef.current && googleButtonRef.current) {
      const googleButtonRect = googleButtonRef.current.getBoundingClientRect();

      // Calculate the scroll position to center the email form

      // Position Google button near the top with some padding
      const targetScrollY = window.scrollY + googleButtonRect.top - 80;

      // Smooth scroll to the calculated position
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      // you can send user info (email, uid, token) to your backend here
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <Auth title="Sign In" classname={"w-[90%] md:w-[60%] lg:w-[32%] "}>
      <div className="space-y-4 ">
        {/* Google Sign In */}
        <GoogleSignInButton
          onClick={handleGoogleLogin}
          buttonRef={googleButtonRef}
        />

        {/* Divider */}
        <AuthDivider text="Or sign in with email" />

        {/* Email/Password Form Section */}
        <form onSubmit={handleSignIn}>
          <div ref={emailFormRef} className="space-y-4">
            <div onClick={handleEmailFieldClick}>
              <EmailField value={email} setEmail={setEmail} />
            </div>

            <PasswordInput
              title="Password"
              password={password}
              setPassword={setPassword}
              isPasswordVisible={isPasswordVisible}
              handleToggleVisibility={() =>
                setIsPasswordVisible((prev) => !prev)
              }
            />

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-200 focus:outline-none focus:underline"
              >
                Forget Password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* succes login Message */}
            {successMsg && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-green-600 text-sm">{successMsg}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-2 space-x-3 pt-4">
              <AuthActionButton
                type="submit"
                text="Sign In"
                loadingText="Signing in..."
                loading={loading}
                disabled={!email || !password}
              />

              <Link to={"/"}>
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                >
                  Cancel
                </button>
              </Link>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <span className="text-gray-600 text-sm">
                Not Registered?{" "}
                <Link to={"/sign-up"}>
                  <button
                    type="button"
                    className="ml-2 text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
                  >
                    Sign Up
                  </button>
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </Auth>
  );
};

export default SignIn;
