import { Box, Title, ActionIcon } from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  selectCartItem,
  updateCartQuantity,
} from "store/slices/cartSlice";
import { QuantityInput } from "./quantityInput";
import cartStyles from "styles/componentsStyles/cart.module.scss";
import { IconTrash } from "@tabler/icons";
import { YesNoModal } from "./yesNoModal";
import { createPath, roundPrice } from "helpers/utils";
import { ImageStore } from "./imageStore";
import Link from "next/link";
import { ITEM_DISPLAY_PATH } from "helpers/strings";
import utilStyles from "styles/utils.module.scss";

export const CartRow = ({ item, index, setSelectedItems, selected }) => {
  const quantity = useSelector(selectCartItem(item.id)).quantity;
  const dispatch = useDispatch();
  const setQuantity = (quantitySetter) => {
    let quantityValue;
    if (typeof quantitySetter === "function") {
      quantityValue = quantitySetter(quantity);
    } else if (typeof quantitySetter === "number") {
      quantityValue = quantitySetter;
    }
    if (quantityValue === 0) {
      setShowModal(true);
      return;
    }
    dispatch(updateCartQuantity({ id: item.id, quantity: quantityValue }));
  };
  const RowCell = rowCellConstructor(index);
  const [showModal, setShowModal] = React.useState(false);
  const deleteItem = () => {
    dispatch(removeCartItem(item.id));
  };
  const handleSelect = (e) => {
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, item.id]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== item.id));
    }
  };
  return (
    <>
      <RowCell className={cartStyles.checkboxContainer}>
        <input type="checkbox" onChange={handleSelect} checked={selected} />
      </RowCell>
      <RowCell>
        <Link href={createPath(ITEM_DISPLAY_PATH(item.id))} scroll>
          <Title order={5}>{item.title}</Title>
        </Link>
      </RowCell>
      <RowCell>
        <Box p={2} className={cartStyles.image}>
          {/* <img className={cartStyles.image} src={itemImageSource(item.image)} /> */}
          <ImageStore image={item.image} />
        </Box>
      </RowCell>
      <RowCell>
        <QuantityInput
          quantity={quantity}
          setQuantity={setQuantity}
          showButtons={true}
          vertical={true}
          min={0}
        ></QuantityInput>
      </RowCell>
      <RowCell>${roundPrice(item.price * item.quantity)}</RowCell>
      <RowCell className={cartStyles.deleteButtonContainer}>
        <ActionIcon
          size={30}
          variant="default"
          onClick={() => setShowModal(true)}
        >
          <IconTrash />
        </ActionIcon>
      </RowCell>
      <YesNoModal
        onNot={() => setShowModal(false)}
        onYes={deleteItem}
        opened={showModal}
      >
        <p className={cartStyles.question}>
          Are you sure to delete{" "}
          <span className={cartStyles.itemTitle}>{item.title}</span> from your
          cart?
        </p>
      </YesNoModal>
    </>
  );
};

// This function returns a react component that renders a table cell
// with its respective background color depending on the index and theme
const rowCellConstructor = (index) => {
  const rowCell = ({ children, className }) => {
    return (
      <Box
        className={className}
        sx={
          index % 2 === 0
            ? (theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2],
              })
            : null
        }
      >
        {children}
      </Box>
    );
  };
  rowCell.displayName = "RowCell";
  return rowCell;
};
