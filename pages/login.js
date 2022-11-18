import React from "react";
import { LoginForm } from "components/loginForm";
import { AuthFormWrapper } from "components/authFormWrapper";

const Login = () => {
  return <AuthFormWrapper FormComponent={LoginForm} />;
};

export default Login;
