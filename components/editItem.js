import React from "react";
import { connect, useDispatch } from "react-redux";
import { ItemForm } from "components/itemForm";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import { useEditItem } from "hooksAndLogic/editItem.hook";
// import { useEffect } from "react";
import { selectUserItemsFetched } from "store/slices/userSlice";

// todo - redirect to 404 when id not found

export const EditItem = connect((state) => ({
  itemsFetched: selectUserItemsFetched(state),
}))(({ item, username, itemsFetched }) => {
  const router = useRouter();
  const {
    editMutation,
    deleteMutation,
    formSettings,
    handleEditItem,
    handleDeleteItem,
  } = useEditItem(username, useDispatch(), router, item, itemsFetched);
  const [image, setImage] = React.useState(null);
  const [tags, setTags] = React.useState(
    item.tags.map((tag) => ({ id: tag.id, text: tag.name, newTag: false }))
  );
  const [editMutate] = useMutation(editMutation);
  const [deleteMutate] = useMutation(deleteMutation);
  const form = useForm(formSettings);

  // useEffect(() => {
  //   console.log("27: item >>>", item);
  // }, []);

  return (
    <ItemForm
      form={form}
      handleSubmit={handleEditItem}
      mutate={editMutate}
      handleDeleteItem={handleDeleteItem}
      deleteMutate={deleteMutate}
      tags={tags}
      setTags={setTags}
      image={image}
      setImage={setImage}
      savedImage={item.image}
      editItem={true}
      itemTitle={item.title}
    ></ItemForm>
  );
});
