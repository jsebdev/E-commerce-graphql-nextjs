export const itemGraphqlQueryFields = `
  id
  title
  subtitle
  seller {
    user {
      id
      username
    }
  }
  tags {
    name
  }
  description
  dateCreated
  dateModified
  published
`;
