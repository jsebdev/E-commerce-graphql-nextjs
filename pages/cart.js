import { Button, Group, Modal, Space, Stack, Text, Title } from "@mantine/core";
import { CartRow } from "components/cartRow";
import { Layout } from "components/layout";
import NonSsrWrapper from "components/nonSsrWrapper";
import { NoPaymentMessage } from "components/noPaymentMessage";
import { YesNoModal } from "components/yesNoModal";
import { LOGIN_PATH, SIGNUP_PATH } from "helpers/strings";
import { createPath, roundPrice } from "helpers/utils";
import Link from "next/link";
import React from "react";
import { connect, useDispatch } from "react-redux";
import {
  emptyCart,
  removeCartItems,
  selectCart,
  selectCartTotal,
} from "store/slices/cartSlice";
import { selectToken, selectUsername } from "store/slices/userSlice";
import cartStyles from "styles/componentsStyles/cart.module.scss";

const Cart = ({ token, username, cart, cartTotal }) => {
  const [showSelectedModal, setShowSelectedModal] = React.useState(false);
  const [showPayModal, setShowPayModal] = React.useState(false);
  const [showEmptyModal, setShowEmptyModal] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const dispatch = useDispatch();
  const deleteItems = () => {
    if (showSelectedModal) {
      dispatch(removeCartItems(selectedItems));
      setSelectedItems([]);
    } else dispatch(emptyCart());
    setShowSelectedModal(false);
    setShowEmptyModal(false);
  };
  return (
    <Layout>
      <NonSsrWrapper>
        <Title order={2} mb={10}>
          Your Cart
        </Title>
        {cart.length === 0 ? (
          <Stack align="center">
            <p className={cartStyles.message}>
              Uh oh! Look&apos;s like your card is empty
            </p>
            <Link href="/">
              <Button>Go to Home</Button>
            </Link>
          </Stack>
        ) : (
          <>
            <Button
              color="red"
              disabled={selectedItems.length === 0}
              mb={10}
              onClick={() => setShowSelectedModal(true)}
            >
              Delete Selected Items
            </Button>
            <div className={cartStyles.table}>
              {cart.map((item, index) => (
                <CartRow
                  key={item.id}
                  item={item}
                  index={index}
                  setSelectedItems={setSelectedItems}
                  selected={selectedItems.some((itemId) => itemId === item.id)}
                />
              ))}
            </div>
            <Group position="center" mt={20}>
              <Title order={3}>Total: {roundPrice(cartTotal)}</Title>
            </Group>
            <Group my={10} position="center">
              <Button onClick={() => setShowPayModal(true)}>Go pay</Button>
              <Button color="red" onClick={() => setShowEmptyModal(true)}>
                Empty cart
              </Button>
            </Group>
          </>
        )}
        <YesNoModal
          opened={showSelectedModal || showEmptyModal}
          onYes={deleteItems}
          onNot={() => {
            setShowSelectedModal(false);
            setShowEmptyModal(false);
          }}
        >
          {showSelectedModal ? (
            <p>
              Are you sure you want to delete{" "}
              {cart.reduce(
                (count, item) =>
                  count + (selectedItems.includes(item.id) ? item.quantity : 0),
                0
              )}{" "}
              items?
            </p>
          ) : (
            <p>Are you sure you want to empty your cart?</p>
          )}
        </YesNoModal>
        <Modal
          opened={showPayModal}
          onClose={() => setShowPayModal(false)}
          // withCloseButton={false}
          centered
        >
          {token && username ? (
            <NoPaymentMessage />
          ) : (
            <Stack align="center">
              <Title order={3}>Ups!</Title>
              <Text>You need to be logged in to pay</Text>
              <Text>
                <Link href={createPath(LOGIN_PATH)}>Log in</Link> or{" "}
                <Link href={createPath(SIGNUP_PATH)}>create an account</Link>
              </Text>
              <Space h={30}></Space>
            </Stack>
          )}
        </Modal>
      </NonSsrWrapper>
    </Layout>
  );
};

export default connect((state) => ({
  cart: selectCart(state),
  cartTotal: selectCartTotal(state),
  token: selectToken(state),
  username: selectUsername(state),
}))(Cart);
