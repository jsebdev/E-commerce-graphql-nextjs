import { Layout } from "components/layout";
import { useRouter } from "next/router";
import React from "react";
import { selectToken, selectUsername } from "store/slices/userSlice";
import { DynamicLoading } from "components/dynamicLoading";
import { EditItem } from "components/editItem";
import { connect } from "react-redux";
import { useProfile } from "hooksAndLogic/profile.hook";
import { useQuery } from "@apollo/client";
import { NO_ITEM_FOUND_ERROR } from "helpers/strings";
import { ITEM_BY_ID } from "helpers/gqlQueries";

const EditItemPage = ({ token, username }) => {
  const router = useRouter();
  const { checkUser } = useProfile({ token, username, router });
  checkUser();
  const { itemId } = router.query;
  const { loading, error, data } = useQuery(ITEM_BY_ID, {
    variables: {
      id: itemId,
    },
  });
  if (error) {
    if (error.message === NO_ITEM_FOUND_ERROR) router.push("/404");
    else return <p>{error.message}</p>;
  }
  return (
    <Layout>
      <DynamicLoading loading={!token || !username || loading}>
        {data && <EditItem username={username} item={data.itemById}></EditItem>}
      </DynamicLoading>
    </Layout>
  );
};

export default connect((state) => ({
  username: selectUsername(state),
  token: selectToken(state),
}))(EditItemPage);
