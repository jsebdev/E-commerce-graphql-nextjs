import { Text, Title } from "@mantine/core";
import React from "react";
import noPaymentMessageStyles from "styles/componentsStyles/noPaymentMessage.module.scss";

export const NoPaymentMessage = () => {
  return (
    <div className={noPaymentMessageStyles.container}>
      <Title order={3}>Congratulations!</Title>
      <Text>You get to the end of this project!</Text>
      <Text>
        Since this is a portfolio project, and the products you see here are not
        really on sell (at least I hope no one actually posted some product here
        trying to sell it haha!) I did not implement any payment method using a
        tool like{" "}
        <a href="https://stripe.com/" target="_blank">
          stripe
        </a>
      </Text>
      <Text>
        You are welcome to check the rest of my projects{" "}
        <a href="https://jseb.dev/work" target="_blank">
          here
        </a>
      </Text>
      <Text>
        Or you can check the code for this project{" "}
        <a href="https://jseb.dev/contact" target="_blank">
          here
        </a>
      </Text>
      <Text>
        If you want to contact me for work or for whatever reason you can do it
        here
      </Text>
      <Text>Peace! ✌️</Text>
    </div>
  );
};
