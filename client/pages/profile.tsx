import Head from "next/head";
import "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUser, isLoggedIn } from "../util/auth.util";
import { UserDAO } from "../repository/Repository";
import { Card, StyledBody } from "baseui/card";

const Profile = () => {
  const router = useRouter();

  const [user, setUser] = useState<UserDAO>({
    auth_provider: "",
    email: "",
    name: "",
    token: "",
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
    } else {
      setUser(getUser());
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Mantra Oauth</title>
        <meta name="description" content="Simple OAuth JWT Implementation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="centered">
        <Card
          overrides={{ Root: { style: { width: "328px" } } }}
          title={user.name}
        >
          <StyledBody>
            {user.email}: {user.auth_provider}
          </StyledBody>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
