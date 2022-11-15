import { Button, Stack, Text, Title } from "@mantine/core";
import { Layout } from "components/layout";
import { Loading } from "components/loading";
import { LOGIN_PATH } from "helpers/strings";
import { createPath, notifyErrors } from "helpers/utils";
import { useActivateAccount } from "hooksAndLogic/activate.hook";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Activate = () => {
  const [errors, setErrors] = useState(null);
  const [fetched, setFetched] = useState(false);
  const router = useRouter();
  const { token } = router.query;
  const dispatch = useDispatch();
  const { activateAccount } = useActivateAccount(dispatch);
  useEffect(async () => {
    if (!token) return;
    const { errors } = await activateAccount(token);
    if (errors) {
      notifyErrors(errors);
      setErrors(errors);
    }
    setFetched(true);
  }, [token]);
  return (
    <Layout>
      {fetched ? (
        <>
          {!errors ? (
            <>
              <Title order={3}>Congratulations</Title>
              <Text>Your account has been activated</Text>
              <Link href={createPath(LOGIN_PATH)}>
                <a>
                  <Button>Login in your account</Button>
                </a>
              </Link>
            </>
          ) : (
            <Stack align="center">
              <Title order={3}>Ups! Something went wrong</Title>
              {errors.map((error) => (
                <Text key={error}>{error}</Text>
              ))}
            </Stack>
          )}
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default Activate;
