import React, { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { toast } from "react-toastify";


import LoginForm from "../Components/LoginForm";
import {useLoginUserMutation} from '../ApiSlice/userSlice';
import {authCredentials} from '../Slice/authSlice'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError,setEmailError] = useState('');
   const [feedback, setFeedback] = useState({
    tooShort: false,
    tooLong: false,
    noSpecialChar: false,
    isValid: false, // Overall validity
  });


  const navigate = useNavigate();
  const dispatch = useDispatch();


  
 const [loginUser, { isLoading, error }] = useLoginUserMutation();
  

  
  const handleChange = (event) => {
    const newEmail = event.target.value;
    
    setEmail(newEmail);
   

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if((!emailRegex.test(newEmail)) ){
      setEmailError('Invalid email format');
    }else{
      setEmailError('')
    }

  }

  const MIN_LENGTH = 8;
  const MAX_LENGTH = 20;

  const passwordHandler = (event) => {
     const newPassword = event.target.value;
      setPassword(newPassword);
      
      const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/;
      //const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])(?=.{8,20}$)[^\s]+$/;
      
       // Define your desired min and max length
        const MIN_LENGTH = 8;
        const MAX_LENGTH = 20;
          
        let currentTooShort = false;
        let currentTooLong = false;
        let currentNoSpecialChar = false;


          if (newPassword.length > 0 && newPassword.length < MIN_LENGTH) {
             currentTooShort = true;
          }
    if (newPassword.length > MAX_LENGTH) {
      currentTooLong = true;
    }

     if (newPassword.length > 0 && !specialCharRegex.test(newPassword)) {
      currentNoSpecialChar = true;
    }
     
     const currentIsValid = !currentTooShort && !currentTooLong && !currentNoSpecialChar && newPassword.length >= MIN_LENGTH;

           setFeedback({
      tooShort: currentTooShort,
      tooLong: currentTooLong,
      noSpecialChar: currentNoSpecialChar,
      isValid: currentIsValid,
    });

  }

 const userInfo =   useSelector(state => state.auth)

    useEffect(()=>{
      if(userInfo){
        navigate('/')
      } else{
        navigate('/login')
      }
    },[userInfo, navigate])


   const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser({ email, password }).unwrap();
       dispatch(authCredentials(result));
       toast.success('Login Success', {
        position: "top-right",
        theme: "colored"
       })
      // Save token or navigate to another page
      setTimeout(() => {navigate('/')}, 1000)
      
    } catch (err) {
      console.error('Login Failed:', err.data.message);
      toast.error( err.data.message, {
        position: "top-right",
      theme: "colored",
      });
    }
  };

  if(isLoading) <div>Loadding...</div>
  if(error) <div>errorr......</div>
  

  return (
    <LoginForm>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-green-700">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={submitHandler}>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                value={email}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                onChange={handleChange}
              />
              {emailError && <p className="text-red-800">{emailError}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={password}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                onChange={passwordHandler}
              />
              <div style={{ marginTop: '10px' }}>
        {feedback.tooShort && password.length < MIN_LENGTH && (
          <p style={{ color: 'red', margin: '5px 0' }}>Password is too short (min {MIN_LENGTH} characters).</p>
        )}
        {feedback.tooLong && password.length > MAX_LENGTH &&  (
          <p style={{ color: 'red', margin: '5px 0' }}>Password is too long (max {MAX_LENGTH} characters).</p>
        )}
        {feedback.noSpecialChar && password.length > 4 && (
          <p style={{ color: 'orange', margin: '5px 0' }}>Password should contain at least one special character.</p>
        )}
        {/* You can add more checks here, e.g., for uppercase, lowercase, digits */}
        {feedback.isValid && password.length >= MIN_LENGTH && (
          <p style={{ color: 'green', margin: '5px 0' }}>Password looks good!</p>
        )}
        {/* {!feedback.isValid && password.length === 0 && (
             <p style={{ color: 'gray', margin: '5px 0' }}>Please enter a password.</p>
        )} */}
      </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Sign in
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
  );
};

export default LoginScreen;
