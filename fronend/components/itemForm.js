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
import React from "react";
import { connect } from "react-redux";
import { selectItemsFetched } from "store/slices/userSlice";
import itemFormStyles from "styles/componentsStyles/itemForm.module.scss";
import { FilePlaceholder, FileValue } from "./fileValue";
import { TagsInput } from "./tagsInput";

export const ItemForm = connect((state) => ({
  itemsFetched: selectItemsFetched(state),
}))(
  ({
    form,
    handleSubmit,
    mutate,
    tags,
    setTags,
    image,
    setImage,
    itemsFetched,
    savedImage = null,
    editItem = false,
    itemTitle = "No Item Title",
  }) => {
    return (
      <div>
        <Title order={3} mb="lg">
          {editItem ? itemTitle : "Add New product"}
        </Title>
        <div className={itemFormStyles.formContainer}>
          <form
            onSubmit={form.onSubmit(
              (values) =>
                handleSubmit(mutate, { values, tags, image }, itemsFetched),
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
            <div className={itemFormStyles.saveButton}>
              <Button type="submit" mt="lg">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);
