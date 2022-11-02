import React from "react";
import { selectToken, selectUsername } from "store/slices/userSlice";
import { connect } from "react-redux";
import { Layout } from "components/layout";

const ProfilePath = ({ token, username }) => {
  return (
    <Layout>
      <div>ProfilePath</div>
    </Layout>
  );
};

// todo - redirect to 404 when id not found

export default connect((state) => ({
  username: selectUsername(state),
  token: selectToken(state),
}))(ProfilePath);
