import type { NextPage } from "next";
import Head from "next/head";
import EmailSignupForm from "../components/SignupForm";
import "../styles/Home.module.css";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { BlockProps } from "baseui/block";
import EmailLoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

const itemProps: BlockProps = {
  // backgroundColor: 'mono300',
  // display: 'flex',
  alignItems: "center",
  justifyContent: "left",
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Mantra Oauth</title>
        <meta name="description" content="Simple OAuth JWT Implementation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="centered">
        <FlexGrid
          flexGridColumnCount={[1, 2]}
          flexGridColumnGap="scale1600"
          flexGridRowGap="scale800"
        >
          <FlexGridItem {...itemProps}>
            <EmailSignupForm />
          </FlexGridItem>

          <FlexGridItem {...itemProps}>
            <EmailLoginForm />
          </FlexGridItem>
        </FlexGrid>
      </div>
    </div>
  );
};

export default Home;
