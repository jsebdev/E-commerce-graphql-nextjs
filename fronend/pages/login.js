import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DynamicUserChecker } from "components/dynamicUseChecker";
import { Layout } from "components/layout";
import { useLogin } from "hooksAndLogic/login.hook";
import { useProfile } from "hooksAndLogic/profile.hook";
import { useRouter } from "next/router";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { selectToken, selectUsername } from "store/slices/userSlice";

const login = ({ token, username }) => {
  const [errorMessages, setErrorMessages] = React.useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { checkNoUser } = useProfile({ token, username, router });
  checkNoUser();
  const { handleLogin, formSettings, handleFormErrors } = useLogin(
    dispatch,
    router
  );
  const form = useForm(formSettings);
  const login = async (e) => {
    const { success, errors } = await handleLogin(e);
    if (!success) {
      setErrorMessages(errors?.nonFieldErrors?.map((error) => error.message));
    }
  };

  return (
    <Layout home={false}>
      <DynamicUserChecker condition={!token || !username}>
        <h3>Log in</h3>
        <form onSubmit={form.onSubmit(login, handleFormErrors)}>
          <TextInput
            id="username"
            placeholder="username"
            label="username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            id="password"
            placeholder="password"
            label="password"
            {...form.getInputProps("password")}
          />
          <Button type="submit">Log In</Button>
        </form>
        {errorMessages.length > 0 && (
          <>
            <p>Errors:</p>
            {errorMessages.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </>
        )}
      </DynamicUserChecker>
    </Layout>
  );
};

export default connect((state) => ({
  token: selectToken(state),
  username: selectUsername(state),
}))(login);
