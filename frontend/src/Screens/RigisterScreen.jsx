import React, { useState } from "react";
import RigisterForm from "../Components/RigisterForm";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//import API from "../server/api.js";

import { useRegissterUserMutation } from "../ApiSlice/userSlice";
import { authCredentials } from "../Slice/authSlice";
//import { toast } from "react-toastify";

const RigisterScreen = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    confPassword: "",
    cellNumber: "",
  });
  // const [Lname, setLname] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmpassword, setConfirmPassword] = useState("");
  // const [mobileNumber, setMobileNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [regissterUser] = useRegissterUserMutation();

  const { FirstName, LastName, email, password, confPassword, cellNumber } =
    formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confPassword) {
      const result = await regissterUser({
        FirstName,
        LastName,
        email,
        password,
        confPassword,
        cellNumber,
      }).unwrap();
      console.log(result);
      dispatch(authCredentials(result));
      setFormData("");
      navigate("/");
    } else {
      alert("pleae enter the correct password");
    }
  };

  return (
    <RigisterForm>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-green-700">
          Rigister for new account
        </h2>
      </div>
      <div className="mt-8 sm:max-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label className="block text-md/1 font-medium text-gray-900">
              Enter First Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={formData.FirstName}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) =>
                  setFormData({ ...formData, FirstName: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-md/1 font-medium text-gray-900">
              Enter Last Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={formData.LastName}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) =>
                  setFormData({ ...formData, LastName: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-md/1 font-medium text-gray-900">
              Enter Email Address
            </label>
            <div className="mt-2">
              <input
                type="email"
                value={formData.email}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-md/1 font-medium text-gray-900">
              Enter password
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={formData.password}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-md/1 font-medium text-gray-900">
              Enter Confirm Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={formData.confPassword}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) =>
                  setFormData({ ...formData, confPassword: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-md/1 font-medium text-gray-900">
              Enter Mobile Number
            </label>
            <div className="mt-2">
              <input
                type="number"
                value={formData.cellNumber}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) =>
                  setFormData({ ...formData, cellNumber: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white  shadow-xs  hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Submit
            </button>
          </div>
          <div className="mt-2">
            Do you have already account?
            <Link
              to="/login"
              className="text-xl/1 font-semibold text-green-600 hover:text-green-500 ml-2"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </RigisterForm>
  );
};

export default RigisterScreen;
