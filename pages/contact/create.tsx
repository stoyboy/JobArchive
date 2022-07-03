import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Body } from "../../components/Body";
import { Create } from "../../components/Contact/Create";
import { Footer } from "../../components/Footer";
import { auth } from "../../firebase/firebase";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = auth.currentUser;

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
};

const CreateContact: NextPage = () => {
  return (
    <div
      className="flex flex-col w-full h-screen min-h-screen"
      data-theme="winter"
    >
      <Head>
        <title>JobArchive</title>
        <meta
          name="description"
          content="JobArchive is a webtool which helps you to manage your company contacts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Body>
        <Create />
      </Body>

      <Footer />
    </div>
  );
};

export default CreateContact;
