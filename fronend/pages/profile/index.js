import React from "react";
import { Button, Title } from "@mantine/core";
import { UserChecker } from "components/userChecker";
import { ItemsGrid } from "components/itemsGrid";
import { Layout } from "components/layout";
import { useProfile } from "hooks/profile.hook";
import { useUserItems } from "hooks/user.hook";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  selectToken,
  selectUserItems,
  selectUsername,
} from "store/slices/userSlice";
import { ADD_PRODUCT_PATH } from "helpers/strings";

const Profile = ({ username, token, userItems }) => {
  const router = useRouter();
  const { fetchUserItems } = useUserItems();
  const [publishedItems, setPublishedItems] = useState([]);
  const [nonPublishedItems, setNonPublishedItems] = useState([]);
  const dispatch = useDispatch();
  const { checkUser } = useProfile();
  checkUser({ token, username, router });
  useEffect(() => {
    console.log("26: username >>>", username);
    console.log("27: token >>>", token);
    console.log(username && token);
    if (userItems.length === 0) fetchUserItems(username, { dispatch });
  }, []);
  useEffect(() => {
    setPublishedItems(userItems.filter((item) => item.published));
    setNonPublishedItems(userItems.filter((item) => !item.published));
  }, [userItems]);
  return (
    <Layout>
      <UserChecker condition={token && username}>
        <Title order={1}>hello {username}!</Title>
        {userItems.length > 0 ? (
          <>
            <Link href={ADD_PRODUCT_PATH.join("/")}>
              <Button>Add new Product</Button>
            </Link>
            <Title order={3}>Your products:</Title>
            <Title order={4}>Published:</Title>
            {publishedItems.length > 0 ? (
              <ItemsGrid items={publishedItems} />
            ) : (
              <p>no published items</p>
            )}
            <Title order={4}>Non published:</Title>
            {nonPublishedItems.length > 0 ? (
              <ItemsGrid items={nonPublishedItems} />
            ) : (
              <p>no non published items</p>
            )}
          </>
        ) : (
          <>
            <Title order={3}>You have no products yet</Title>
            <Link href={ADD_PRODUCT_PATH.join("/")}>
              Add your first product
            </Link>
          </>
        )}
      </UserChecker>
    </Layout>
  );
};

export default connect((state) => ({
  username: selectUsername(state),
  token: selectToken(state),
  userItems: selectUserItems(state),
}))(Profile);
