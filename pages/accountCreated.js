import { Alert, Stack, Text, Title } from "@mantine/core";
import { Layout } from "components/layout";
import React from "react";
import { connect } from "react-redux";
import { selectActivationEmail } from "store/slices/userSlice";
import accountCreatedStyles from "styles/componentsStyles/accountCreated.module.scss";
import Image from "next/image";
import { RESEND_ACTIVATION_EMAIL } from "helpers/gqlQueries";
import { useMutation } from "@apollo/client";
import { setLoading } from "store/slices/loaderSlice";
import { IconAlertCircle } from "@tabler/icons";
import { ClientOnly2 } from "components/clientOnly2";

const AccountCreated = ({ email, setLoading }) => {
  const [resendActivationMutate, { data, loading, error }] = useMutation(
    RESEND_ACTIVATION_EMAIL,
    {
      variables: { email },
      onError: (error) => console.log("el handler error", error),
    }
  );
  React.useEffect(() => {
    setLoading(loading);
  }, [loading]);
  return (
    <Layout>
      <ClientOnly2>
        <Stack>
          <Title order={4}>
            Just one more task to finish your account creation brave shopper!
          </Title>
          <Text>
            Please activate your account following the link sent to{" "}
            <span className={accountCreatedStyles.email}>{email}</span>.
          </Text>
          <Alert
            icon={
              <Image
                src="/images/owl_64.png"
                width={35}
                height={35}
                alt="advice"
              />
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
          <Text
            mt="lg"
            underline
            className={accountCreatedStyles.resendEmail}
            onClick={() => resendActivationMutate()}
          >
            Resend Email
          </Text>
          {data && (
            <Alert
              icon={
                <Image
                  src="/images/owl_64.png"
                  width={35}
                  height={35}
                  alt="advice"
                />
              }
              title="No worries"
              color="green"
              styles={{
                icon: {
                  width: "30px",
                },
              }}
            >
              A new link has been send to{" "}
              <span className={accountCreatedStyles.email}>{email}</span>.
            </Alert>
          )}
          {error && (
            <Alert
              icon={<IconAlertCircle size={30} />}
              title="Ups!"
              color="red"
              styles={{
                icon: {
                  width: "30px",
                },
              }}
            >
              Something went wrong. Please try again later. {error.message}
            </Alert>
          )}
        </Stack>
      </ClientOnly2>
    </Layout>
  );
};

export default connect(
  (state) => ({ email: selectActivationEmail(state) }),
  (dispatch) => ({
    setLoading: (loading) => dispatch(setLoading(loading)),
  })
)(AccountCreated);
