import React from "react";
import { AuthFormWrapperNoConnection } from "components/authFormWrapper";
import { LoginForm } from "components/loginForm";

const SignUp = () => {
  return <AuthFormWrapperNoConnection FormComponent={LoginForm} />;
};

export default SignUp;
