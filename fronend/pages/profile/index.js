import { Layout } from "components/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { selectToken, selectUsername } from "store/slices/userSlice";

const Profile = ({ username, token }) => {
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <Layout home={false}>
      <h1>User page</h1>
      <p>hello: {username}</p>
    </Layout>
  );
};

export default connect((state) => ({
  username: selectUsername(state),
  token: selectToken(state),
}))(Profile);
