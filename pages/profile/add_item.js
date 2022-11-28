import { useRouter } from "next/router";
import React from "react";
import {
  selectUserItemsFetched,
  selectToken,
  selectUsername,
} from "store/slices/userSlice";
import { connect, useDispatch } from "react-redux";
import { useProfile } from "hooksAndLogic/profile.hook";
import { Layout } from "components/layout";
import { DynamicLoading } from "components/dynamicLoading";
import { useAddItem } from "hooksAndLogic/addItem.hook";
import { useApolloClient } from "@apollo/client";
import { ItemForm } from "components/itemForm";

const AddProduct = ({ token, username }) => {
  const router = useRouter();
  const { checkUser } = useProfile({ token, username, router });
  checkUser();
  const [image, setImage] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  const client = useApolloClient();
  const { mutate, form, handleAddItem } = useAddItem(
    username,
    useDispatch(),
    useRouter(),
    client
  );
  return (
    <Layout>
      <DynamicLoading loading={!token || !username}>
        <ItemForm
          form={form}
          handleSubmit={handleAddItem}
          mutate={mutate}
          tags={tags}
          setTags={setTags}
          image={image}
          setImage={setImage}
        ></ItemForm>
      </DynamicLoading>
    </Layout>
  );
};

export default connect((state) => ({
  username: selectUsername(state),
  token: selectToken(state),
  itemsFetched: selectUserItemsFetched(state),
}))(AddProduct);
