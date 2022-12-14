import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { connect } from "react-redux";
import { selectShowWelcome, setShowWelcome } from "store/slices/welcomeSlice";
import welcomeMessageStyles from "styles/componentsStyles/welcomeMessage.module.scss";
import { InlineButton } from "./themedComponents/inlineButton";

export const WelcomeMessage = connect(
  (state) => ({
    showWelcome: selectShowWelcome(state),
  }),
  (dispatch) => ({
    closeWelcome: () => dispatch(setShowWelcome(false)),
  })
)(({ showWelcome, closeWelcome }) => {
  return (
    <Modal
      opened={showWelcome}
      onClose={closeWelcome}
      title={<Title order={2}>I&apos;m glad you&apos;re here! 👋</Title>}
      withCloseButton={true}
    >
      <Stack>
        <Text>
          Welcome to this e-commerce website made by{" "}
          <a href="https://jseb.dev" target="_blank" rel="noreferrer">
            <InlineButton>this guy</InlineButton>
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
              <InlineButton>Server side rendering with Next.js</InlineButton>
            </a>
          </li>
          <li>
            <a
              href="https://www.djangoproject.com/"
              target="_blank"
              rel="noreferrer"
            >
              <InlineButton>Python with Django</InlineButton>
            </a>
          </li>
          <li>
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
              <InlineButton>React</InlineButton>
            </a>
          </li>
          <li>
            <a
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noreferrer"
            >
              <InlineButton py={0} variant="subtle">
                Redux-toolkit
              </InlineButton>
            </a>
          </li>
          <li>
            <a
              href="https://www.apollographql.com/"
              target="_blank"
              rel="noreferrer"
            >
              <InlineButton>Apollo Client</InlineButton>
            </a>
          </li>
          <li>
            <a
              href="https://django-graphql-auth.readthedocs.io/en/latest/"
              target="_blank"
              rel="noreferrer"
            >
              <InlineButton>Graphql_auth with JWT</InlineButton>
            </a>
          </li>
          <li>
            <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
              <InlineButton>Docker</InlineButton>
            </a>
          </li>
        </ul>
        <Text>
          Please Feel free to create an account, publish some products and try
          to &quot;buy&quot; some products as well. Give it a try and give me
          your valuable feedback! 🧐
        </Text>
        <Text>
          You can also see the code of this project here:{" "}
          <a
            href="https://github.com/jsebdev/E-commerce-graphql-nextjs"
            target="_blank"
            rel="noreferrer"
          >
            <InlineButton>Frontend</InlineButton>
          </a>{" "}
          and here:{" "}
          <a
            href="https://github.com/jsebdev/E-commerce-graphql-django"
            target="_blank"
            rel="noreferrer"
          >
            <InlineButton>Backend</InlineButton>.
          </a>{" "}
        </Text>
        <Text>
          And if you want to contact me for work or for whatever reason you can
          do it{" "}
          <a href="https://jseb.dev/contact" target="_blank" rel="noreferrer">
            <InlineButton>here</InlineButton>.
          </a>
        </Text>
        <Text>
          Have fun, enjoy life and don&apos;t forget to brush your teeth! 🤟
        </Text>
        <Group position="center">
          <Button onClick={closeWelcome}>Close this message</Button>
        </Group>
      </Stack>
    </Modal>
  );
});
