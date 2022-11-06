import { ActionIcon, Group } from "@mantine/core";
import React from "react";

export const QuantityInput = ({ quantity, setQuantity }) => {
  const incrementValue = () => {
    setQuantity((v) => v + 1);
  };
  const decrementValue = () => {
    if (quantity > 1) setQuantity((v) => v - 1);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuantity(parseInt(value));
  };
  return (
    <Group noWrap="nowrap">
      <ActionIcon
        size={30}
        variant="default"
        onClick={decrementValue}
        disabled={quantity <= 1}
      >
        –
      </ActionIcon>
      <input
        type="number"
        value={quantity}
        min={1}
        step={1}
        onChange={handleInputChange}
        style={{ width: "40px" }}
      />
      <ActionIcon size={30} variant="default" onClick={incrementValue}>
        +
      </ActionIcon>
    </Group>
  );
};
