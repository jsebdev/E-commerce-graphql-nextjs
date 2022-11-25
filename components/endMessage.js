import { Button, Stack, Text, Title } from "@mantine/core";
import React from "react";
import endMessageStyles from "styles/componentsStyles/endMessage.module.scss";

export const EndMessage = () => {
  return (
    <Stack className={endMessageStyles.container}>
      <Title order={3}>Congratulations!</Title>
      <Text>You got to the end of this project!</Text>
      <Text>
        Since this is a portfolio project, and the products you see here are not
        really to sell (at least I hope no one actually posted some product here
        trying to sell it haha!) I did not implement any payment method using a
        tool like{" "}
        <Button p={0} variant="subtle">
          <a href="https://stripe.com/" target="_blank" rel="noreferrer">
            stripe
          </a>
        </Button>
      </Text>
      <Text>
        You are welcome to check the rest of my projects{" "}
        <Button p={0} variant="subtle">
          <a href="https://jseb.dev/work" target="_blank" rel="noreferrer">
            here
          </a>
        </Button>
      </Text>
      <Text>
        Or you can check the code for this project in these links:{" "}
        <Button p={0} variant="subtle">
          <a
            href="https://github.com/jsebdev/E-commerce-django-nextjs"
            target="_blank"
            rel="noreferrer"
          >
            frontend with next.js
          </a>
        </Button>{" "}
        or{" "}
        <Button p={0} variant="subtle">
          <a
            href="https://github.com/jsebdev/E-commerce-graphql-django"
            target="_blank"
            rel="noreferrer"
          >
            backend with django
          </a>
        </Button>
      </Text>
      <Text>
        If you want to contact me for work or for whatever reason you can do it{" "}
        <Button p={0} variant="subtle">
          <a href="https://jseb.dev/contact" target="_blank" rel="noreferrer">
            here
          </a>
        </Button>
      </Text>
      <Text>Peace! ✌️</Text>
    </Stack>
  );
};
