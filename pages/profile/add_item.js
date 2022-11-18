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
import { useForm } from "@mantine/form";
import { useAddItem } from "hooksAndLogic/addItem.hook";
import { useMutation } from "@apollo/client";
import { ItemForm } from "components/itemForm";

const AddProduct = ({ token, username }) => {
  const router = useRouter();
  const { checkUser } = useProfile({ token, username, router });
  checkUser();
  const [image, setImage] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  const { mutation, formSettings, handleAddItem } = useAddItem(
    username,
    useDispatch(),
    useRouter()
  );
  const [mutate] = useMutation(mutation);
  const form = useForm(formSettings);
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
