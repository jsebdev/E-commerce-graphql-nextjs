import {
  Button,
  Checkbox,
  FileInput,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { notifyFormErrors } from "helpers/utils";
import React, { useState } from "react";
import itemFormStyles from "styles/componentsStyles/itemForm.module.scss";
import { FilePlaceholder, FileValue } from "./fileValue";
import { TagsInput } from "./tagsInput";
import { YesNoModal } from "./yesNoModal";

export const ItemForm = ({
  form,
  handleSubmit,
  mutate,
  handleDeleteItem,
  deleteMutate,
  tags,
  setTags,
  image,
  setImage,
  savedImage = null,
  editItem = false,
  itemTitle = "No Item Title",
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState();
  return (
    <div>
      <Title order={3} mb="lg">
        {editItem ? itemTitle : "Add New product"}
      </Title>
      <div className={itemFormStyles.formContainer}>
        <form
          onSubmit={form.onSubmit(
            (values) => handleSubmit(mutate, { values, tags, image }),
            notifyFormErrors
          )}
          className={itemFormStyles.form}
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
          <TagsInput tags={tags} setTags={setTags} />
          <div className={itemFormStyles.imageInputContainer}>
            <FileInput
              className={itemFormStyles.imageInput}
              value={image}
              onChange={setImage}
              id="image"
              placeholder={<FilePlaceholder savedImage={savedImage} />}
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
            styles={{ input: { height: "300px" } }}
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
          <div className={itemFormStyles.buttonsContainer}>
            <Button type="submit">Save</Button>
            {editItem && (
              <Button
                variant="filled"
                color="red"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </div>

      <YesNoModal
        opened={showDeleteModal}
        onYes={() => handleDeleteItem(deleteMutate)}
        onNot={() => {
          setShowDeleteModal(false);
        }}
      >
        <p>Are you sure you want to delete this item?</p>
      </YesNoModal>
    </div>
  );
};
