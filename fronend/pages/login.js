import { Layout } from "components/layout";
import { useLogin } from "hooks/login.hook";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

const login = () => {
  const [errorMessages, setErrorMessages] = React.useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleLogin } = useLogin(dispatch, router);

  const login = async (e) => {
    const { success, errors } = await handleLogin(e);
    if (!success) {
      setErrorMessages(errors?.nonFieldErrors?.map((error) => error.message));
    }
  };

  return (
    <Layout home={false}>
      <h3>Log in</h3>
      <form onSubmit={login}>
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
