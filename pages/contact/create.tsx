import type { NextPage } from "next";
import Head from "next/head";
import { Body } from "../../components/Body";
import { Create } from "../../components/Contact/Create";
import { Footer } from "../../components/Footer";
import { Dashboard } from "../../components/Root/Dashboard";

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