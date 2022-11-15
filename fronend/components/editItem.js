import React from "react";
import { useDispatch } from "react-redux";
import { ItemForm } from "components/itemForm";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import { useEditItem } from "hooksAndLogic/editItem.hook";
import { useEffect } from "react";

// todo - redirect to 404 when id not found

export const EditItem = ({ item, username }) => {
  const router = useRouter();

  const { mutation, formSettings, handleEditItem } = useEditItem(
    username,
    useDispatch(),
    router,
    item
  );
  const [image, setImage] = React.useState(null);
  const [tags, setTags] = React.useState(
    item.tags.map((tag) => ({ id: tag.id, text: tag.name, newTag: false }))
  );
  const [mutate] = useMutation(mutation);
  const form = useForm(formSettings);

  useEffect(() => {
    console.log("27: item >>>", item);
  }, []);

  return (
    <ItemForm
      form={form}
      handleSubmit={handleEditItem}
      mutate={mutate}
      tags={tags}
      setTags={setTags}
      image={image}
      setImage={setImage}
      savedImage={item.image}
      editItem={true}
      itemTitle={item.title}
    ></ItemForm>
  );
};
