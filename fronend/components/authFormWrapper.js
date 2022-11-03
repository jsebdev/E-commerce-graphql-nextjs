import { showNotification } from "@mantine/notifications";
import { useProfile } from "hooksAndLogic/profile.hook";
import { useRouter } from "next/router";
import React from "react";
import { connect } from "react-redux";
import { selectToken, selectUsername } from "store/slices/userSlice";
import { DynamicUserChecker } from "./dynamicUseChecker";
import { Layout } from "./layout";

export const AuthFormWrapperNoConnection = ({
  token,
  username,
  FormComponent,
}) => {
  const [errorMessages, setErrorMessages] = React.useState([]);
  const router = useRouter();
  const { checkNoUser } = useProfile({ token, username, router });
  checkNoUser();
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

export const authFormWrapper = connect((state) => ({
  token: selectToken(state),
  username: selectUsername(state),
}))(AuthFormWrapperNoConnection);
