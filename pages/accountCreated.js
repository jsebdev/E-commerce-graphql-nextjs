import { Alert, Text, Title } from "@mantine/core";
import { Layout } from "components/layout";
import React from "react";
import { connect } from "react-redux";
import { selectActivationEmail } from "store/slices/userSlice";
import accountCreatedStyles from "styles/componentsStyles/accountCreated.module.scss";
import Image from "next/image";

const AccountCreated = ({ email }) => {
  return (
    <Layout>
      <Title order={4} mb="lg">
        Your Account was created successfully
      </Title>
      <Text mb="lg">
        Please activate your account following the activation link sent to{" "}
        <span className={accountCreatedStyles.email}>{email}</span>.
      </Text>
      <Alert
        icon={
          <Image src="/images/owl_64.png" width={64} height={64} alt="advice" />
        }
        title="A piece of ancient wisdom"
        color="yellow"
      >
        Check again.... It is quite possible that the email is in the spam
        folder
      </Alert>
    </Layout>
  );
};

export default connect((state) => ({ email: selectActivationEmail(state) }))(
  AccountCreated
);
