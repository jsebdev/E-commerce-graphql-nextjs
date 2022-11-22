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
import { Alert, Box } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";

const AuthFormWrapperNoConnection = ({ token, username, FormComponent }) => {
  // useEffect(() => {
  //   console.log("17: token >>>", token);
  //   console.log("18: username >>>", username);
  // });
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
            {errorMessages.length > 0 && (
              <Box my="lg">
                {errorMessages.map((message) => (
                  <Alert
                    my="sm"
                    icon={<IconAlertCircle size={16} />}
                    title="Don't panic but..."
                    color="red"
                    key={message}
                  >
                    {message}
                  </Alert>
                ))}
              </Box>
            )}
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
