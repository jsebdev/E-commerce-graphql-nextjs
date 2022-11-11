import { useRouter } from "next/router";
import React from "react";
import { selectToken, selectUsername } from "store/slices/userSlice";
import { connect, useDispatch } from "react-redux";
import { useProfile } from "hooksAndLogic/profile.hook";
import { Layout } from "components/layout";
import {
  Button,
  Checkbox,
  FileInput,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DynamicUserChecker } from "components/dynamicUseChecker";
import { useForm } from "@mantine/form";
import { useItem } from "hooksAndLogic/item.hook";
import { TagsInput } from "components/tagsInput";
import addItemStyles from "styles/componentsStyles/add_item.module.scss";
import { FilePlaceholder, FileValue } from "components/fileValue";
import { useRef } from "react";

const AddProduct = ({ token, username }) => {
  // const imageInputRef = useRef(null);
  const [image, setImage] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  const router = useRouter();
  const { checkUser } = useProfile({ token, username, router });
  checkUser();
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
          <Title order={3} mb="lg">
            Add New product
          </Title>
          <div className={addItemStyles.formContainer}>
            <form
              onSubmit={form.onSubmit(
                (values) => handleAddItem(values, tags, image),
                handleFormErrors
              )}
              className={addItemStyles.form}
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
              <div className={addItemStyles.imageInputContainer}>
                <FileInput
                  value={image}
                  onChange={setImage}
                  id="image"
                  placeholder={<FilePlaceholder />}
                  label="Image"
                  variant="unstyled"
                  accept="image/png,image/jpeg"
                  // multiple
                  valueComponent={FileValue}
                />
              </div>
              <Textarea
                id="description"
                placeholder="Description"
                label="Description"
                withAsterisk
                {...form.getInputProps("description")}
              />
              <NumberInput
                id="price"
                placeholder="Price"
                label="Price"
                withAsterisk
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "$ "
                }
                hideControls
                min={0}
                precision={2}
                step={0.01}
                {...form.getInputProps("price")}
              />
              <TagsInput tags={tags} setTags={setTags} />
              <Checkbox
                styles={{
                  root: {
                    display: "flex",
                    justifyContent: "center",
                  },
                }}
                id="published"
                label="published"
                {...form.getInputProps("published", { type: "checkbox" })}
                mt="md"
              />
              <Button type="submit" mt="lg">
                Save
              </Button>
            </form>
          </div>
        </div>
      </DynamicUserChecker>
    </Layout>
  );
};

export default connect((state) => ({
  username: selectUsername(state),
  token: selectToken(state),
}))(AddProduct);
