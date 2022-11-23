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
        Just one more task to finish your account creation brave shopper!
      </Title>
      <Text mb="lg">
        Please activate your account following the link sent to{" "}
        <span className={accountCreatedStyles.email}>{email}</span>.
      </Text>
      <Alert
        icon={
          <Image src="/images/owl_64.png" width={35} height={35} alt="advice" />
        }
        title="A piece of ancient wisdom"
        color="yellow"
        styles={{
          icon: {
            width: "30px",
          },
        }}
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
