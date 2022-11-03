import React from "react";
import { Loading } from "./loading";

// export const UserChecker = ({ children, condition }) => {
const UserChecker = ({ children, condition = true }) => {
  return <>{condition ? <>{children}</> : <Loading />}</>;
};

export default UserChecker;
