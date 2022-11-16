import {
  Box,
  Title,
  ActionIcon,
  Center,
  Paper,
  Group,
  Stack,
  Button,
} from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  selectCartItem,
  updateQuantity,
} from "store/slices/cartSlice";
import { QuantityInput } from "./quantityInput";
import cartStyles from "styles/componentsStyles/cart.module.scss";
import { BsFillTrashFill } from "react-icons/bs";
import Image from "next/image";
import { YesNoModal } from "./yesNoModal";
import { itemImageSource } from "helpers/utils";

export const CartRow = ({ item, index, setSelectedItems, selected }) => {
  const quantity = useSelector(selectCartItem(item.id)).quantity;
  const dispatch = useDispatch();
  const setQuantity = (quantity) => {
    if (quantity === 0) {
      setShowModal(true);
      return;
    }
    dispatch(updateQuantity({ id: item.id, quantity }));
  };
  const RowCell = rowCellConstructor(index);
  const [showModal, setShowModal] = React.useState(false);
  const deleteItem = () => {
    dispatch(removeItem(item.id));
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
      <RowCell>
        <input type="checkbox" onChange={handleSelect} checked={selected} />
      </RowCell>
      <RowCell>
        <Title order={5}>{item.title}</Title>
      </RowCell>
      <RowCell>
        <Box p={1}>
          <img className={cartStyles.image} src={itemImageSource(item.image)} />
        </Box>
      </RowCell>
      <RowCell>
        <QuantityInput
          quantity={quantity}
          setQuantity={setQuantity}
          showButtons={false}
          min={0}
        ></QuantityInput>
      </RowCell>
      <RowCell>${item.price * item.quantity}</RowCell>
      <RowCell>
        <ActionIcon
          size={30}
          variant="default"
          onClick={() => setShowModal(true)}
        >
          <BsFillTrashFill />
        </ActionIcon>
      </RowCell>
      {showModal && (
        <YesNoModal onNot={() => setShowModal(false)} onYes={deleteItem}>
          <p className={cartStyles.question}>
            Are you sure to delete{" "}
            <span className={cartStyles.itemTitle}>{item.title}</span> from your
            cart?
          </p>
        </YesNoModal>
      )}
    </>
  );
};

// This function returns a react component that renders a table cell
// with its respective background color depending on the index and theme
const rowCellConstructor = (index) => {
  const rowCell = ({ children }) => {
    return (
      <Box
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
