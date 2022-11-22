import {
  Button,
  Checkbox,
  FileInput,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { NO_TAGS_MESSAGE } from "helpers/strings";
import { notifyError, notifyFormErrors } from "helpers/utils";
import React, { useState } from "react";
import { connect } from "react-redux";
import { selectUserItemsFetched } from "store/slices/userSlice";
import itemFormStyles from "styles/componentsStyles/itemForm.module.scss";
import { FilePlaceholder, FileValue } from "./fileValue";
import { TagsInput } from "./tagsInput";
import { YesNoModal } from "./yesNoModal";

export const ItemForm = connect((state) => ({
  itemsFetched: selectUserItemsFetched(state),
}))(
  ({
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
    itemsFetched,
  }) => {
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [tagsError, setTagsError] = useState(false);
    const submit = (e) => {
      e.preventDefault();
      let error;
      if (tags.length === 0) {
        setTagsError(true);
        error = true;
        notifyError(NO_TAGS_MESSAGE);
      } else {
        setTagsError(false);
        error = false;
      }
      const formOnSubmit = form.onSubmit(
        (values) =>
          handleSubmit(mutate, {
            values,
            tags,
            image,
            itemsFetched,
            error,
          }),
        notifyFormErrors
      );
      formOnSubmit(e);
    };
    return (
      <div>
        <Title order={3} mb="lg">
          {editItem ? itemTitle : "Add New product"}
        </Title>
        <div className={itemFormStyles.formContainer}>
          <form onSubmit={submit} className={itemFormStyles.form}>
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
            <div>
              <TagsInput
                tags={tags}
                setTags={setTags}
                displayError={tagsError}
              />
              {tagsError && (
                <div className={itemFormStyles.noTagsMessage}>
                  {NO_TAGS_MESSAGE}
                </div>
              )}
            </div>
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
              {editItem && (
                <Button
                  variant="filled"
                  color="red"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </Button>
              )}
              <Button type="submit">Save</Button>
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
  }
);
