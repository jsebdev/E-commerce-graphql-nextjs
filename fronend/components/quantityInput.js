import React from "react";
import { ActionIcon, Group } from "@mantine/core";
import classNames from "classnames";
import quantityInputStyles from "styles/componentsStyles/quantityInput.module.scss";

export const QuantityInput = ({
  quantity,
  setQuantity,
  showButtons = true,
  min = 1,
  vertical = false,
}) => {
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
    <Group
      noWrap="nowrap"
      className={classNames({ [quantityInputStyles.vertical]: vertical })}
    >
      {showButtons && (
        <ActionIcon
          size={30}
          variant="default"
          onClick={decrementValue}
          disabled={quantity <= 1}
        >
          –
        </ActionIcon>
      )}
      <input
        type="number"
        value={quantity}
        min={min}
        step={1}
        onChange={handleInputChange}
        className={quantityInputStyles.input}
      />
      {showButtons && (
        <ActionIcon size={30} variant="default" onClick={incrementValue}>
          +
        </ActionIcon>
      )}
    </Group>
  );
};
