import { gql } from "@apollo/client";
import client from "apollo-client";
import { Layout } from "components/layout";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { setToken, setUsername } from "store/userSlice";

const login = () => {
  const [errorMessages, setErrorMessages] = React.useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const mutation = gql`
      mutation {
        tokenAuth(username: "${username}", password: "${password}") {
          token
          success
          errors
          user {
            username
          }
          unarchiving
          refreshToken
        }
      }
    `;
    const { data } = await client.mutate({ mutation });
    const { success, errors, user, token } = data.tokenAuth;
    if (!success) {
      setErrorMessages(errors.nonFieldErrors.map((error) => error.message));
      return;
    }
    dispatch(setToken(token));
    dispatch(setUsername(user.username));
    router.push("/profile");
  };
  return (
    <Layout home={false}>
      <h3>Log in</h3>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="Log in" />
      </form>
      {errorMessages.length > 0 && (
        <>
          <p>Errors:</p>
          {errorMessages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </>
      )}
    </Layout>
  );
};

export default login;
