import React from "react";

const LoginForm = ({ children }) => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
      {children}
    </div>
  );
};

export default LoginForm;
