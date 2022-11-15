import ClientOnly from "components/clientOnly";
import Profile from "components/profile";
import React from "react";

const IndexProfile = () => {
  return (
    <ClientOnly>
      <Profile />
    </ClientOnly>
  );
};

export default IndexProfile;
