import React from "react";

// export const UserChecker = ({ children, condition }) => {
const UserChecker = ({ children, condition }) => {
  return <>{condition ? <>{children}</> : <p>loading...</p>}</>;
};

export default UserChecker;
