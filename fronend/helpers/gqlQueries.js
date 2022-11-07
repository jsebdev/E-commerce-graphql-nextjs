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
  }
  description
  dateCreated
  dateModified
  published
`;
