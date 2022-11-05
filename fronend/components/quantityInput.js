import { ActionIcon, Group, NumberInput } from "@mantine/core";
import React, { useRef } from "react";

export const QuantityInput = () => {
  const quantityRef = useRef();
  return (
    <Group>
      <ActionIcon
        size={30}
        variant="default"
        onClick={() => quantityRef.current.decrement()}
      >
        –
      </ActionIcon>
      <NumberInput
        handlersRef={quantityRef}
        placeholder={1}
        // label="quantity"
        size="xs"
        min={1}
        step={1}
        defaultValue={1}
        styles={{ input: { width: 54, textAlign: "center" } }}
        hideControls
      />
      <ActionIcon
        size={30}
        variant="default"
        onClick={() => quantityRef.current.increment()}
      >
        +
      </ActionIcon>
    </Group>
  );
};
