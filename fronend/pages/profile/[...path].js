import { UserChecker } from "components/userChecker";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { selectToken, selectUsername } from "store/slices/userSlice";
import { connect } from "react-redux";
import { useProfile } from "hooks/profile.hook";
import { ADD_PRODUCT_PATH, ProfileRouterOptions } from "helpers/strings";

const ProfilePath = ({ token, username }) => {
  const router = useRouter();
  const { checkUser } = useProfile();
  checkUser({ token, username, router });
  const { path } = router.query;
  const [option, setOption] = React.useState("");
  useEffect(() => {
    if (path.join() === ADD_PRODUCT_PATH.slice(1).join()) {
      setOption(ProfileRouterOptions.addProduct);
      return;
    }
  });
  return (
    <UserChecker condition={token && username}>
      <div>
        ProfilePath
        {path.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    </UserChecker>
  );
};

export default connect((state) => ({
  username: selectUsername(state),
  token: selectToken(state),
}))(ProfilePath);
