import { gql } from "@apollo/client";
import util from "util";

export const queryForCountriesMaps = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

export const printObj = (obj) => {
  console.log(util.inspect(obj, false, null, true /* enable colors */));
};
