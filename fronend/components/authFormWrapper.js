import { showNotification } from "@mantine/notifications";
import { useProfile } from "hooksAndLogic/profile.hook";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { selectToken, selectUsername } from "store/slices/userSlice";
import { DynamicUserChecker } from "./dynamicUseChecker";
import { Layout } from "./layout";

const AuthFormWrapperNoConnection = ({ token, username, FormComponent }) => {
  useEffect(() => {
    console.log("17: token >>>", token);
    console.log("18: username >>>", username);
  });
  const [errorMessages, setErrorMessages] = React.useState([]);
  const router = useRouter();
  const { checkAlreadyLoggedIn } = useProfile({ token, username, router });
  checkAlreadyLoggedIn();
  const displayErrors = (errorMessages) => {
    setErrorMessages(errorMessages);
    errorMessages.forEach((errorMessage) =>
      showNotification({
        message: errorMessage,
        color: "red",
      })
    );
  };
  return (
    <Layout home={false}>
      <DynamicUserChecker condition={!token || !username}>
        <FormComponent displayErrors={displayErrors} />
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

export const AuthFormWrapper = connect((state) => ({
  token: selectToken(state),
  username: selectUsername(state),
}))(AuthFormWrapperNoConnection);
