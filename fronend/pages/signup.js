import React from "react";
import { AuthFormWrapperNoConnection } from "components/authFormWrapper";
import { SignUpForm } from "components/signupForm";

const SignUp = () => {
  return <AuthFormWrapperNoConnection FormComponent={SignUpForm} />;
};

export default SignUp;
