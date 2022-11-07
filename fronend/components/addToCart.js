import { Button, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "store/slices/cartSlice";
import { QuantityInput } from "./quantityInput";
import addToCartStyles from "styles/componentsStyles/addToCart.module.scss";

export const AddToCart = ({ item, quantity, setQuantity }) => {
  const dispatch = useDispatch();
  const addItemHandler = () => {
    dispatch(
      addItem({
        id: item.id,
        title: item.title,
        quantity,
        price: item.price,
        description: item.description,
      })
    );
    showNotification({
      message: "Item added to cart successfully",
      color: "green",
    });
    setQuantity(1);
  };
  return (
    <Stack className={addToCartStyles.container}>
      <QuantityInput quantity={quantity} setQuantity={setQuantity} />
      <Button onClick={addItemHandler}>Add to Cart</Button>
    </Stack>
  );
};
