import React from "react";
import { SignUpForm } from "components/signupForm";
import { AuthFormWrapper } from "components/authFormWrapper";

const SignUp = () => {
  return <AuthFormWrapper FormComponent={SignUpForm} />;
};

export default SignUp;
