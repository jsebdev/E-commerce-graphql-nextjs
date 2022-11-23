import { showNotification } from "@mantine/notifications";
import { useProfile } from "hooksAndLogic/profile.hook";
import { useRouter } from "next/router";
import React from "react";
// import { useEffect } from "react";
import { connect } from "react-redux";
import { selectToken, selectUsername } from "store/slices/userSlice";
import { DynamicLoading } from "./dynamicLoading";
import { Layout } from "./layout";
import authFormWrapperStyles from "styles/componentsStyles/authFormWrapper.module.scss";
import { ErrorMessages } from "./errorMessages";

const AuthFormWrapperNoConnection = ({ token, username, FormComponent }) => {
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
      <DynamicLoading loading={token && username}>
        <div className={authFormWrapperStyles.page}>
          <div className={authFormWrapperStyles.formContainer}>
            <FormComponent displayErrors={displayErrors} />
            <ErrorMessages errorMessages={errorMessages}></ErrorMessages>
          </div>
        </div>
      </DynamicLoading>
    </Layout>
  );
};

export const AuthFormWrapper = connect((state) => ({
  token: selectToken(state),
  username: selectUsername(state),
}))(AuthFormWrapperNoConnection);
