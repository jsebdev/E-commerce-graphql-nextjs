import { useEffect } from "react";

export const useProfile = () => {
  const checkUser = ({ token, username, router }) => {
    useEffect(() => {
      if (!token || !username) {
        router.push("/login");
      }
    }, []);
  };
  return { checkUser };
};
