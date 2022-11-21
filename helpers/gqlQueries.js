import { gql } from "@apollo/client";

export const mutateAnswers = {
  editSuccess: "MutateItemSuccess",
  error: "MutateItemFailed",
  deleteSuccess: "DeleteItemSuccess",
};

export const itemGraphqlQueryFields = `
  id
  title
  subtitle
  price
  seller {
    username
  }
  tags {
    name
    id
  }
  description
  dateCreated
  dateModified
  published
  image
`;

export const ALL_ITEMS = gql`
  query {
    items (filter:true, published:true) {
      ${itemGraphqlQueryFields}
    }
  }
`;

export const CREATE_ITEM = gql`
mutation CreateItem($title: String!,
                    $subtitle: String!,
                    $description: String!,
                    $published: Boolean!,
                    $price: Decimal!,
                    $seller: String!,
                    $tags: [ID!]!,
                    $newTags: [String!]!,
                    $image: Upload) {
  createItem(
    title:$title,
    subtitle:$subtitle,
    description:$description,
    published:$published,, 
    price:$price
    seller:$seller, 
    tags:$tags,
    newTags:$newTags,
    image: $image,
  ) {
    __typename
    ... on ${mutateAnswers.error} {
      errorMessage
    }
    ... on ${mutateAnswers.editSuccess} {
      item {
        ${itemGraphqlQueryFields}
      }
    }
  }
}
`;

export const EDIT_ITEM = gql`
mutation EditItem($id: ID!,
                  $title: String!,
                  $subtitle: String!,
                  $description: String!,
                  $published: Boolean!,
                  $price: Decimal!,
                  $tags: [ID!]!,
                  $newTags: [String!]!,
                  $image: Upload) {
  modifyItem(
    id: $id,
    title:$title,
    subtitle:$subtitle,
    description:$description,
    published:$published,, 
    price:$price
    tags:$tags,
    newTags:$newTags,
    image:$image
  ) {
    __typename
    ... on ${mutateAnswers.error} {
      errorMessage
    }
    ... on ${mutateAnswers.editSuccess} {
      item {
        ${itemGraphqlQueryFields}
      }
    }
  }
}
`;

export const VERIFY_ACCOUNT = (token) => gql`
mutation {
  verifyAccount(token: "${token}") {
    success
    errors
  }
}
`;

export const LOGIN = (values) => gql`
mutation {
  tokenAuth(username: "${values.username}", password: "${values.password}") {
    token
    success
    errors
    user {
      username
    }
    unarchiving
    refreshToken
  }
}
`;

export const SEARCH_ITEMS = (search) => gql`
query {
  itemsBySearch(searchText:"${search}") {
    ${itemGraphqlQueryFields}
  }
}`;

export const SIGN_UP = (values) => gql`
mutation {
  register (email:"${values.email}",
            username:"${values.username}",
            password1: "${values.password1}",
            password2:"${values.password2}") {
    success
    errors
  }
}
`;

export const TAGS_QUERY = gql`
  query Tags($filter: Boolean, $withItems: Boolean, $withPublished: Boolean) {
    tags(
      filter: $filter
      withItems: $withItems
      withPublished: $withPublished
    ) {
      id
      name
    }
  }
`;

export const ALL_ITEMS_IDS = gql`
  query {
    items {
      id
    }
  }
`;

export const ITEM_BY_ID_SERVER = (itemId) => gql`
    query {
      itemById(id: "${itemId}") {
        ${itemGraphqlQueryFields}
      }
    }
  `;

export const ITEM_BY_ID = gql`
    query ItemById($id: ID!) {
      itemById(id:$id) {
        ${itemGraphqlQueryFields}
      }
    }
  `;

export const ITEMS_BY_SELLER = (username) => gql`
query {
  itemsBySeller (username:"${username}") {
    ${itemGraphqlQueryFields}
  }
}`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      __typename
      ... on MutateItemFailed {
        errorMessage
      }
      ... on DeleteItemSuccess {
        success
      }
    }
  }
`;

export const ITEMS_BY_TAGS = gql`
  query ItemsByTags($tagsIds: [ID!]!) {
    itemsByTags(tagsIds: $tagsIds) {
      ${itemGraphqlQueryFields}
    }
  }
`;
