import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
//import axios from "axios";

import LoginForm from "../Components/LoginForm";
import { useLoginUserMutation } from "../ApiSlice/userSlice";
import { authCredentials } from "../Slice/authSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const MIN_LENGTH = 8;
  const MAX_LENGTH = 20;

  const [feedback, setFeedback] = useState({
    tooShort: false,
    tooLong: false,
    noSpecialChar: false,
    noNumber: false,
    noUpper: false,
    noLower: false,
    isValid: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.userInfo?.userInfo);
  // Get user from Redux or localStorage
  const localUser = (() => {
    try {
      const persistedRoot = localStorage.getItem("persist:root");
      if (persistedRoot) {
        const parsedRoot = JSON.parse(persistedRoot);
        if (parsedRoot.userInfo) {
          return JSON.parse(parsedRoot.userInfo);
        }
      }
      return JSON.parse(localStorage.getItem("userInfo")) || null;
    } catch {
      return null;
    }
  })();

  const user = reduxUser || localUser;
  //console.log(user);
  const name = user?.name;
  console.log(name);

  useEffect(() => {
    if (name) {
      navigate("/");
    }
  }, [name, navigate]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    ///console.log(newEmail);
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(newEmail) ? "Invalid email format" : "");
  };

  const validatePassword = (password) => {
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    return {
      tooShort: password.length > 0 && password.length < MIN_LENGTH,
      tooLong: password.length > MAX_LENGTH,
      noSpecialChar: password.length > 0 && !specialCharRegex.test(password),
      noNumber: password.length > 0 && !hasNumber,
      noUpper: password.length > 0 && !hasUpper,
      noLower: password.length > 0 && !hasLower,
      isValid:
        password.length >= MIN_LENGTH &&
        password.length <= MAX_LENGTH &&
        specialCharRegex.test(password) &&
        hasNumber &&
        hasUpper &&
        hasLower,
    };
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setFeedback(validatePassword(newPassword));
  };

  // Submit handler login function

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!feedback.isValid) return;
    //console.log('Sending:', { email, password });
    try {
      const res = await loginUser({
        email: email.trim(),
        password: password,
      }).unwrap();

      //console.log('Full response:', res);

      dispatch(authCredentials(res));
      toast.success("Login Success", {
        position: "top-right",
        theme: "colored",
      });
      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      toast.error(errorMsg, { position: "top-right", theme: "colored" });
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <LoginForm>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-green-700">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    required
                    autoComplete="username"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                    onChange={handleEmailChange}
                  />
                  {emailError && (
                    <p className="text-red-800 text-sm mt-1">{emailError}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-green-600 hover:text-green-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                    onChange={handlePasswordChange}
                  />

                  <div className="mt-2 text-xs">
                    {feedback.tooShort && (
                      <p className="text-red-600">
                        • Too short (min {MIN_LENGTH} chars)
                      </p>
                    )}
                    {feedback.tooLong && (
                      <p className="text-red-600">
                        • Too long (max {MAX_LENGTH} chars)
                      </p>
                    )}
                    {feedback.noSpecialChar && (
                      <p className="text-orange-600">
                        • Needs special character
                      </p>
                    )}
                    {feedback.noNumber && (
                      <p className="text-orange-600">• Needs number</p>
                    )}
                    {feedback.noUpper && (
                      <p className="text-orange-600">
                        • Needs uppercase letter
                      </p>
                    )}
                    {feedback.noLower && (
                      <p className="text-orange-600">
                        • Needs lowercase letter
                      </p>
                    )}
                    {feedback.isValid && (
                      <p className="text-green-600">
                        ✓ Password meets all requirements
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={
                    !email || !password || isLoading || !feedback.isValid
                  }
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
                    !email || !password || isLoading || !feedback.isValid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-500"
                  }`}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            <p className="mt-8 ml-2 text-left text-md/3 text-gray-500">
              New Customer?
              <Link
                to="/signUp"
                className="font-semibold text-green-700 hover:text-green-500 ml-1"
              >
                SignUp here
              </Link>
            </p>
            <div className="mt-2 text-md ml-2">
              <Link
                to="/Forgot"
                className="font-semibold text-green-600 hover:text-green-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </LoginForm>
      )}
    </>
  );
};

export default LoginScreen;
