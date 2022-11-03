import { useEffect } from "react";

export const useProfile = ({ token, username, router }) => {
  const checkUser = () => {
    useEffect(() => {
      if (!token || !username) {
        router.push("/login");
      }
    }, []);
  };
  const checkNoUser = () => {
    useEffect(() => {
      if (token && username) {
        router.push("/");
      }
    }, []);
  };
  return { checkUser, checkNoUser };
};
