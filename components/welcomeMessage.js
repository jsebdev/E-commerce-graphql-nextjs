import { Button, Modal, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { connect } from "react-redux";
import { selectShowWelcome, setShowWelcome } from "store/slices/welcomeSlice";
import welcomeMessageStyles from "styles/componentsStyles/welcomeMessage.module.scss";

export const WelcomeMessage = connect(
  (state) => ({
    showWelcome: selectShowWelcome(state),
  }),
  (dispatch) => ({
    closeWelcome: () => dispatch(setShowWelcome(false)),
  })
)(({ showWelcome, closeWelcome }) => {
  return (
    <Modal opened={showWelcome} onClose={closeWelcome} withCloseButton={false}>
      <Stack>
        <Title order={2} align="center">
          I&apos;m glad you&apos;re here! 👋
        </Title>
        <Text>
          Welcome to this e-commerce website made by{" "}
          <a href="https://jseb.dev" target="_blank" rel="noreferrer">
            <Button p={0} variant="subtle">
              this guy
            </Button>
          </a>{" "}
          that refuses to use a CMS for his projects and his hair does it to
          stay combed.
        </Text>
        <Text>
          This is a project I did during my free time to improve my skills in
          building full stack applications.
        </Text>
        <Text>The main technologies used in this project are:</Text>
        <ul className={welcomeMessageStyles.techList}>
          <li>
            <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
              <Button py={0} variant="subtle">
                React with Next.js
              </Button>
            </a>
          </li>
          <li>
            <a
              href="https://www.djangoproject.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Button py={0} variant="subtle">
                Python with Django
              </Button>
            </a>
          </li>
          <li>
            <a
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noreferrer"
            >
              <Button py={0} variant="subtle">
                Redux-toolkit
              </Button>
            </a>
          </li>
          <li>
            <a
              href="https://www.apollographql.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Button py={0} variant="subtle">
                Apollo
              </Button>
            </a>
          </li>
          <li>
            <a
              href="https://django-graphql-auth.readthedocs.io/en/latest/"
              target="_blank"
              rel="noreferrer"
            >
              <Button py={0} variant="subtle">
                Graphql_auth with JWT
              </Button>
            </a>
          </li>
          <li>
            <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
              <Button py={0} variant="subtle">
                Docker
              </Button>
            </a>
          </li>
        </ul>
        <Text>
          Please Feel free to create an account, publish some products ot try to
          &quot;buy&quot; some products as well. Give it a try and let me know
          what you think! 🧐
        </Text>
        <Text>
          And if you want to contact me for work or for whatever reason you can
          do it{" "}
          <a href="https://jseb.dev/contact" target="_blank" rel="noreferrer">
            <Button p={0} variant="subtle">
              here
            </Button>
            .
          </a>
        </Text>
        <Text>
          Have fun, enjoy life and don&apos;t forget to brush your teeth! 🤟
        </Text>
      </Stack>
    </Modal>
  );
});
