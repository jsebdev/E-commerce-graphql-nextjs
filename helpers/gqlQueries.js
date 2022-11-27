import { gql } from "@apollo/client";

export const mutateAnswers = {
  editSuccess: "MutateItemSuccess",
  error: "MutateItemFailed",
  deleteSuccess: "DeleteItemSuccess",
};

export const userFields = `
  id
  username
  email
`;

export const itemGraphqlQueryFields = `
  id
  title
  subtitle
  price
  seller {
    ${userFields}
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

export const LOGIN_WITH_USERNAME = ({ username, password }) => gql`
mutation {
  tokenAuth(username: "${username}", password: "${password}") {
    token
    success
    errors
    user {
      ${userFields}
    }
    unarchiving
  }
}
`;

export const LOGIN_WITH_EMAIL = (values) => gql`
mutation {
  tokenAuth(email: "${values.username}", password: "${values.password}") {
    token
    success
    errors
    user {
      ${userFields}
    }
    unarchiving
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

export const UPDATE_ACCOUNT = (email, username) => gql`
  mutation {
    updateAccount(email:"${email}" , username: "${username}") {
      success
      errors
    }
  }
`;

export const CHANGE_PASSWORD = (oldPassword, newPassword1, newPassword2) => gql`
  mutation {
    passwordChange(
      oldPassword: "${oldPassword}"
      newPassword1: "${newPassword1}"
      newPassword2: "${newPassword2}"
    ) {
      success
      errors
      token
    }
  }
`;

export const RESEND_ACTIVATION_EMAIL = gql`
  mutation ResendActivation($email: String!) {
    resendActivationEmail(email: $email) {
      success
      errors
    }
  }
`;

export const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation ResetPasswordEmail($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
      errors
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $token: String!
    $password1: String!
    $password2: String!
  ) {
    passwordReset(
      token: $token
      newPassword1: $password1
      newPassword2: $password2
    ) {
      success
      errors
    }
  }
`;
