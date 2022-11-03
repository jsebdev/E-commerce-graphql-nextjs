import { useRouter } from "next/router";
import React from "react";
import { selectToken, selectUsername } from "store/slices/userSlice";
import { connect, useDispatch } from "react-redux";
import { useProfile } from "hooksAndLogic/profile.hook";
import { Layout } from "components/layout";
import { Button, Checkbox, Textarea, TextInput, Title } from "@mantine/core";
import { DynamicUserChecker } from "components/dynamicUseChecker";
import { useForm } from "@mantine/form";
import { useItem } from "hooksAndLogic/item.hook";
import { TagsInput } from "components/tagsInput";

const AddProduct = ({ token, username }) => {
  const [tags, setTags] = React.useState([]);
  const router = useRouter();
  const { checkUser } = useProfile();
  checkUser({ token, username, router });
  const { formSettings, handleAddItem, handleFormErrors } = useItem(
    username,
    useDispatch(),
    useRouter()
  );
  const form = useForm(formSettings);
  return (
    <Layout>
      <DynamicUserChecker condition={token && username}>
        <div>
          <Title order={3}>Add New product</Title>
          <form
            onSubmit={form.onSubmit(
              (values) => handleAddItem(values, tags),
              handleFormErrors
            )}
          >
            <TextInput
              withAsterisk
              id="title"
              placeholder="Title"
              label="Title"
              {...form.getInputProps("title")}
            />
            <TextInput
              id="subtitle"
              placeholder="Sub-title"
              label="Sub-title"
              {...form.getInputProps("subtitle")}
            />
            <Textarea
              id="description"
              placeholder="Description"
              label="Description"
              withAsterisk
              {...form.getInputProps("description")}
            />
            <Checkbox
              id="published"
              label="published"
              {...form.getInputProps("published", { type: "checkbox" })}
            />
            <TagsInput tags={tags} setTags={setTags} />
            <Button type="submit">Save</Button>
          </form>
        </div>
      </DynamicUserChecker>
    </Layout>
  );
};

export default connect((state) => ({
  username: selectUsername(state),
  token: selectToken(state),
}))(AddProduct);
