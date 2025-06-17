import React, { useState } from "react";
import RigisterForm from "../Components/RigisterForm";
import { Link } from "react-router-dom";

const RigisterScreen = () => {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmpassword) {
      alert("passwords matched!");
    } else {
      alert("pleae enter the correct password");
    }

    console.log({
      firstName: Fname,
      lastName: Lname,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
      mobileNumber: mobileNumber,
    });
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
                value={Fname}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) => setFname(e.target.value)}
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
                value={Lname}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) => setLname(e.target.value)}
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
                value={email}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmpassword}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                value={mobileNumber}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                onChange={(e) => setMobileNumber(e.target.value)}
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
