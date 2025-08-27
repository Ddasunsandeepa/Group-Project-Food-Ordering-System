import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import PasswordInput from "../components/Auth/PasswordField";
import EmailField from "../components/Auth/EmailField";
import AuthActionButton from "../components/Auth/AuthActionButton";
import { Link } from "react-router-dom";
import NameField from "../components/Auth/NameField";
import PhoneNumberField from "../components/Auth/PhoneNumberField";
import { useUser } from "../contexts/UserContext";
import { postData } from "../api/Api";
import { SignUpResponse, User } from "../types";
import { useCart } from "../contexts/CartContext";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [passwordWarning, setPasswordWarning] = useState<string | null>(null);
  const { syncCartOnLogin } = useCart();

  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  const from = (location.state as { from?: string })?.from || "/";

  React.useEffect(() => {
    setError(null);
    setSuccessMsg(null);
    setName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await postData<SignUpResponse>("/api/user/signup", {
        name: name,
        phone: phoneNumber,
        email: email,
        password: password,
      });

      setLoading(false);

      if (response) {
        const user: User = {
          id: response.user.id!,
          name: response.user.name,
          email: response.user.email,
          phone: response.user.phone,
          token: response.token,
          isAdmin: false,
          isVegan: false,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setSuccessMsg("Account created successfully!");

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 500);

        await syncCartOnLogin(user);

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1200);
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong.");
      console.error("Signup error:", err);
    }
  };

  return (
    <Auth title="Sign Up" classname={"w-[90%] md:w-[60%] lg:w-[40%]"}>
      <form onSubmit={handleSignUp} autoComplete="off">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-6 md:gap-x-4">
            <NameField value={name} setName={setName} />
            <PhoneNumberField value={phoneNumber} setPhone={setPhoneNumber} />
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-6 md:gap-x-4">
            <EmailField value={email} setEmail={setEmail} />
            <PasswordInput
              title="Password"
              password={password}
              setPassword={setPassword}
              isPasswordVisible={isPasswordVisible}
              setPasswordWarning={setPasswordWarning}
              handleToggleVisibility={() =>
                setIsPasswordVisible((prev) => !prev)
              }
            />
          </div>

          {/* Password Warning */}
          {passwordWarning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-yellow-600 text-sm">{passwordWarning}</p>
            </div>
          )}

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
              text="Sign Up"
              loadingText="Signing Up..."
              loading={loading}
              disabled={!email || !password || !name}
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
              Already Registered?{" "}
              <Link to={"/sign-in"}>
                <button
                  type="button"
                  className="ml-2 text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
                  onClick={() => console.log("Navigate to sign up")}
                >
                  Sign In
                </button>
              </Link>
            </span>
          </div>
        </div>
      </form>
    </Auth>
  );
};

export default SignUp;
