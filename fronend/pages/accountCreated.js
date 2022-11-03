import { Text, Title } from "@mantine/core";
import { Layout } from "components/layout";
import React from "react";
import { connect } from "react-redux";
import { selectActivationEmail } from "store/slices/userSlice";

const AccountCreated = ({ email }) => {
  return (
    <Layout>
      <Title order={2}>Congratulations</Title>
      <Title order={4}>Your Account was created successfully</Title>
      <Text>
        Please activate your account following the activation link sent to{" "}
        {email}.
      </Text>
    </Layout>
  );
};

export default connect((state) => ({ email: selectActivationEmail(state) }))(
  AccountCreated
);
