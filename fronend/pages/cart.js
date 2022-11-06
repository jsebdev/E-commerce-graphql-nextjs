import { Title } from "@mantine/core";
import { Layout } from "components/layout";
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { selectCart } from "store/slices/cartSlice";

const Cart = ({ cart }) => {
  useEffect(() => {
    console.log("10: cart >>>", cart);
  });
  return (
    <Layout>
      <Title order={2}>Your Cart</Title>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default connect((state) => ({ cart: selectCart(state) }))(Cart);
