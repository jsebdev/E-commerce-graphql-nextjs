import React from "react";
import { Box, Button, Center, Group, Stack, Text, Title } from "@mantine/core";
// import { UserChecker } from "components/userChecker";
import { ItemsGrid } from "components/itemsGrid";
import { Layout } from "components/layout";
import { useProfile } from "hooksAndLogic/profile.hook";
import { fetchUserItems } from "hooksAndLogic/user.logic";
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
  const dispatch = useDispatch();
  const [publishedItems, setPublishedItems] = useState([]);
  const [nonPublishedItems, setNonPublishedItems] = useState([]);
  const { checkUser } = useProfile({ token, username, router });
  checkUser();
  useEffect(() => {
    if (userItems.length === 0) fetchUserItems(username, dispatch);
  }, []);
  useEffect(() => {
    setPublishedItems(userItems.filter((item) => item.published));
    setNonPublishedItems(userItems.filter((item) => !item.published));
  }, [userItems]);
  return (
    <Layout>
      <DynamicUserChecker condition={token && username}>
        {/* <Group position="apart" align="flex-start" spacing={0}> */}
        <Group position="apart" spacing="sm" mb={20}>
          <Title order={1}>Welcome {username}!</Title>
          {userItems.length > 0 && (
            <Link href={createPath(ADD_ITEM_PATH)}>
              {/* <Center my={20}> */}
              <Button>Add new item</Button>
              {/* </Center> */}
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
              <ItemsGrid items={publishedItems} />
            ) : (
              <Center>
                <Text>You don't have any published item.</Text>
              </Center>
            )}
            <Title order={4} mt={40}>
              Non published:
            </Title>
            {nonPublishedItems.length > 0 ? (
              <ItemsGrid items={nonPublishedItems} />
            ) : (
              <Center>
                <Text>You don't have any non published item.</Text>
              </Center>
            )}
          </>
        ) : (
          <Stack align="center">
            <Title order={3}>You have no products yet</Title>
            <Link href={createPath(ADD_ITEM_PATH)}>
              <Button>Add your first product</Button>
            </Link>
          </Stack>
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
