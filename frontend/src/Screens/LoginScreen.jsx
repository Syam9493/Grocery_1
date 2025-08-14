// import React, { useEffect, useState } from "react";
// import {Link, useNavigate } from "react-router-dom";
// import {useDispatch, useSelector} from 'react-redux';
// import { toast } from "react-toastify";


// import LoginForm from "../Components/LoginForm";
// //import {useLoginUserMutation} from '../ApiSlice/userSlice';
// import {authCredentials} from '../Slice/authSlice';
// import axios from "axios";

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [emailError,setEmailError] = useState('');
//    const [feedback, setFeedback] = useState({
//     tooShort: false,
//     tooLong: false,
//     noSpecialChar: false,
//     isValid: false, // Overall validity
//   });


//   const navigate = useNavigate();
//   const dispatch = useDispatch();


  
//  //const [loginUser, { isLoading, error }] = useLoginUserMutation();
  

  
//   const handleChange = (event) => {
//     const newEmail = event.target.value;
    
//     setEmail(newEmail);
   

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
//     if((!emailRegex.test(newEmail)) ){
//       setEmailError('Invalid email format');
//     }else{
//       setEmailError('')
//     }

//   }

//   const MIN_LENGTH = 8;
//   const MAX_LENGTH = 20;

//   const passwordHandler = (event) => {
//      const newPassword = event.target.value;
//       setPassword(newPassword);
      
//       const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/;
//       //const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])(?=.{8,20}$)[^\s]+$/;
      
//        // Define your desired min and max length
//         const MIN_LENGTH = 8;
//         const MAX_LENGTH = 20;
          
//         let currentTooShort = false;
//         let currentTooLong = false;
//         let currentNoSpecialChar = false;


//           if (newPassword.length > 0 && newPassword.length < MIN_LENGTH) {
//              currentTooShort = true;
//           }
//     if (newPassword.length > MAX_LENGTH) {
//       currentTooLong = true;
//     }

//      if (newPassword.length > 0 && !specialCharRegex.test(newPassword)) {
//       currentNoSpecialChar = true;
//     }
     
//      const currentIsValid = !currentTooShort && !currentTooLong && !currentNoSpecialChar && newPassword.length >= MIN_LENGTH;

//            setFeedback({
//       tooShort: currentTooShort,
//       tooLong: currentTooLong,
//       noSpecialChar: currentNoSpecialChar,
//       isValid: currentIsValid,
//     });

//   }

//  const userInfo =   useSelector(state => state.auth)

//     useEffect(()=>{
//       if(userInfo){
//         navigate('/')
//       } else{
//         navigate('/login')
//       }
//     },[userInfo, navigate])


//    const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log(email, password);
//     try {
//     const result = await axios.post(
//       "http://localhost:5000/api/user/login",
//       { email, password }, // actual data
//       { headers: { "Content-Type": "application/json" } } // config
//     );
//       //const result = await loginUser({ email, password }).unwrap();
//        dispatch(authCredentials(result));
//        toast.success('Login Success', {
//         position: "top-right",
//         theme: "colored"
//        })
//       // Save token or navigate to another page
//       setTimeout(() => {navigate('/')}, 1000)
      
//     } catch (err) {
//       console.error('Login Failed:', err.data.message);
//       toast.error( err.data.message, {
//         position: "top-right",
//       theme: "colored",
//       });
//     }
//   };

//   //if(isLoading) <div>Loadding...</div>
//   //if(error) <div>errorr......</div>
  

//   return (
//     <LoginForm>
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-green-700">
//           Sign in to your account
//         </h2>
//       </div>
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form className="space-y-6" method="POST" onSubmit={submitHandler}>
//           <div>
//             <label className="block text-sm/6 font-medium text-gray-900">
//               Email address
//             </label>
//             <div className="mt-2">
//               <input
//                 type="email"
//                 value={email}
//                 required
//                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
//                 onChange={handleChange}
//               />
//               {emailError && <p className="text-red-800">{emailError}</p>}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm/6 font-medium text-gray-900">
//               Password
//             </label>
//             <div className="mt-2">
//               <input
//                 type="password"
//                 value={password}
//                 required
//                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
//                 onChange={passwordHandler}
//               />
//               <div style={{ marginTop: '10px' }}>
//         {feedback.tooShort && password.length < MIN_LENGTH && (
//           <p style={{ color: 'red', margin: '5px 0' }}>Password is too short (min {MIN_LENGTH} characters).</p>
//         )}
//         {feedback.tooLong && password.length > MAX_LENGTH &&  (
//           <p style={{ color: 'red', margin: '5px 0' }}>Password is too long (max {MAX_LENGTH} characters).</p>
//         )}
//         {feedback.noSpecialChar && password.length > 4 && (
//           <p style={{ color: 'orange', margin: '5px 0' }}>Password should contain at least one special character.</p>
//         )}
//         {/* You can add more checks here, e.g., for uppercase, lowercase, digits */}
//         {feedback.isValid && password.length >= MIN_LENGTH && (
//           <p style={{ color: 'green', margin: '5px 0' }}>Password looks good!</p>
//         )}
//         {/* {!feedback.isValid && password.length === 0 && (
//              <p style={{ color: 'gray', margin: '5px 0' }}>Please enter a password.</p>
//         )} */}
//       </div>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         <p className="mt-8 ml-2 text-left text-md/3 text-gray-500">
//           New Customer?
//           <Link
//             to="/signUp"
//             className="font-semibold text-green-700 hover:text-green-500 ml-1"
//           >
//             SignUp here
//           </Link>
//         </p>
//         <div className="mt-2 text-md ml-2">
//           <Link
//             to="/Forgot"
//             className="font-semibold text-green-600 hover:text-green-500"
//           >
//             Forgot password?
//           </Link>
//         </div>
//       </div>
//       </LoginForm>
//   );
// };

// export default LoginScreen;



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import axios from "axios";
import LoginForm from "../Components/LoginForm";
import { authCredentials } from '../Slice/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  const {  name } = useSelector((state) => state.userInfo || {});
  console.log(name);

  useEffect(() => {
    if (name) {
      navigate('/');
    }
  }, [name, navigate]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    console.log(newEmail);
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(newEmail) ? 'Invalid email format' : '');
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
      isValid: password.length >= MIN_LENGTH &&
               password.length <= MAX_LENGTH &&
               specialCharRegex.test(password) &&
               hasNumber && hasUpper && hasLower
    };
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setFeedback(validatePassword(newPassword));
  };

//  const submitHandler = async (e) => {
//   e.preventDefault();
  
//   try {
//     const response = await axios.post(
//       'http://localhost:5000/login',
//       JSON.stringify({ email: email.trim(), password: password.trim() }),
//       {
//         headers: {
//           'Content-Type': 'application/json', // Force JSON content type
//         },
//         withCredentials: true
//       }
//     );
//     dispatch(authCredentials(response.data));
//     setIsLoading(false);
//     // Handle success
//   } catch (err) {
//     console.error('Login error:', err.response?.data);
//   }
// };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!feedback.isValid) return;
    console.log('Sending:', { email, password });
    setIsLoading(true);
    try {
      const { data } = await axios.post(
         'http://localhost:5000/login',
         {
    email: email.trim(),
    password: password
  },
        { headers: { "Content-Type": "application/json" } }
      );
      
      dispatch(authCredentials(data));
      toast.success('Login Success', { position: "top-right", theme: "colored" });
      navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      toast.error(errorMsg, { position: "top-right", theme: "colored" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              {emailError && <p className="text-red-800 text-sm mt-1">{emailError}</p>}
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
                {showPassword ? 'Hide' : 'Show'}
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
                {feedback.tooShort && <p className="text-red-600">• Too short (min {MIN_LENGTH} chars)</p>}
                {feedback.tooLong && <p className="text-red-600">• Too long (max {MAX_LENGTH} chars)</p>}
                {feedback.noSpecialChar && <p className="text-orange-600">• Needs special character</p>}
                {feedback.noNumber && <p className="text-orange-600">• Needs number</p>}
                {feedback.noUpper && <p className="text-orange-600">• Needs uppercase letter</p>}
                {feedback.noLower && <p className="text-orange-600">• Needs lowercase letter</p>}
                {feedback.isValid && <p className="text-green-600">✓ Password meets all requirements</p>}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!email || !password || isLoading || !feedback.isValid}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
                (!email || !password || isLoading || !feedback.isValid) 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-700 hover:bg-green-500'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
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


