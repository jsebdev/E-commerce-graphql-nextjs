import React from "react";
import { Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { ItemsGrid } from "components/itemsGrid";
import { Layout } from "components/layout";
import { useProfile } from "hooksAndLogic/profile.hook";
import { fetchUserItems } from "hooksAndLogic/user.logic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  selectUserItemsFetched,
  selectToken,
  selectUserItems,
  selectUsername,
  setItemsFetched,
} from "store/slices/userSlice";
import { ADD_ITEM_PATH } from "helpers/strings";
import { DynamicLoading } from "components/dynamicLoading";
import { createPath } from "helpers/utils";

const Profile = ({ username, token, userItems, itemsFetched }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [publishedItems, setPublishedItems] = useState([]);
  const [nonPublishedItems, setNonPublishedItems] = useState([]);
  const { checkUser } = useProfile({ token, username, router });
  checkUser();
  useEffect(() => {
    (async () => {
      if (!itemsFetched) {
        console.log("fetching items in profile page");
        await fetchUserItems(username, dispatch);
        dispatch(setItemsFetched(true));
      }
    })();
  }, []);
  useEffect(() => {
    setPublishedItems(userItems.filter((item) => item.published));
    setNonPublishedItems(userItems.filter((item) => !item.published));
  }, [userItems]);
  return (
    <Layout>
      <DynamicLoading loading={!token || !username}>
        <Group position="apart" spacing="sm" mb={20}>
          <Title order={1}>Welcome {username}!</Title>
          {userItems.length > 0 && (
            <Link href={createPath(ADD_ITEM_PATH)}>
              <Button>Add new item</Button>
            </Link>
          )}
        </Group>
        {userItems.length > 0 ? (
          <>
            <Title order={3} my={20}>
              Your products:
            </Title>
            <Title order={4} mt="lg">
              Published:
            </Title>
            {publishedItems.length > 0 ? (
              <ItemsGrid items={publishedItems} inHome={false} />
            ) : (
              <Center>
                <Text>You don't have any published item.</Text>
              </Center>
            )}
            <Title order={4} mt={40}>
              Non published:
            </Title>
            {nonPublishedItems.length > 0 ? (
              <ItemsGrid items={nonPublishedItems} inHome={false} />
            ) : (
              <Center>
                <Text>You don't have any non published item.</Text>
              </Center>
            )}
          </>
        ) : (
          <Stack align="center" mt={100}>
            <Title order={3}>You have no products yet</Title>
            <Link href={createPath(ADD_ITEM_PATH)}>
              <Button>Add your first product</Button>
            </Link>
          </Stack>
        )}
      </DynamicLoading>
    </Layout>
  );
};

export default connect((state) => ({
  username: selectUsername(state),
  token: selectToken(state),
  userItems: selectUserItems(state),
  itemsFetched: selectUserItemsFetched(state),
}))(Profile);
