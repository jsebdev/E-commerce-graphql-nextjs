import { LOGIN_PATH } from "helpers/strings";
import { createPath } from "helpers/utils";
import { useEffect } from "react";

export const useProfile = ({ token, username, router }) => {
  // this method checks if the users is not logged in.
  // if they are not logged in, they are redirected to the login page.
  const checkUser = () => {
    useEffect(() => {
      if (!token || !username) {
        router.push(createPath(LOGIN_PATH));
      }
    }, [token, username]);
  };
  // This method checks if the users is logged in.
  // If it is, it redirects to the home page.
  const checkAlreadyLoggedIn = () => {
    useEffect(() => {
      if (token && username) {
        router.push("/");
      }
    }, [token, username]);
  };
  return { checkUser, checkAlreadyLoggedIn };
};
