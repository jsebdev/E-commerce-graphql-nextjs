import { gql } from "@apollo/client";

export const queryForCountriesMaps = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;
