import React from "react";
import { Button, Title } from "@mantine/core";
// import { UserChecker } from "components/userChecker";
import { ItemsGrid } from "components/itemsGrid";
import { Layout } from "components/layout";
import { useProfile } from "hooksAndLogic/profile.hook";
import { useUserItems } from "hooksAndLogic/user.hook";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  selectToken,
  selectUserItems,
  selectUsername,
} from "store/slices/userSlice";
import { ADD_ITEM_PATH } from "helpers/strings";
import { DynamicUserChecker } from "components/dynamicUseChecker";
import { createPath } from "helpers/utils";

const Profile = ({ username, token, userItems }) => {
  const router = useRouter();
  const { fetchUserItems } = useUserItems(username, useDispatch());
  const [publishedItems, setPublishedItems] = useState([]);
  const [nonPublishedItems, setNonPublishedItems] = useState([]);
  const { checkUser } = useProfile({ token, username, router });
  checkUser();
  useEffect(() => {
    if (userItems.length === 0) fetchUserItems();
  }, []);
  useEffect(() => {
    setPublishedItems(userItems.filter((item) => item.published));
    setNonPublishedItems(userItems.filter((item) => !item.published));
  }, [userItems]);
  return (
    <Layout>
      {/* <UserChecker condition={token && username}> */}
      <DynamicUserChecker condition={token && username}>
        <Title order={1}>hello {username}!</Title>
        {userItems.length > 0 ? (
          <>
            <Link href={createPath(ADD_ITEM_PATH)}>
              <Button>Add new item</Button>
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
            <Link href={createPath(ADD_ITEM_PATH)}>Add your first product</Link>
          </>
        )}
      </DynamicUserChecker>
    </Layout>
  );
};

export default connect((state) => ({
  username: selectUsername(state),
  token: selectToken(state),
  userItems: selectUserItems(state),
}))(Profile);
