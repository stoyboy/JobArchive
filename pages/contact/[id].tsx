import { Contact } from '@prisma/client';
import axios from 'axios';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { Body } from '../../components/Body';
import { View } from '../../components/Contact/View';
import { Footer } from '../../components/Footer';
import { auth } from '../../firebase/firebase';

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
    const { id } = context.query;
    const response = await axios.get('http://localhost:3000/api/getOne', {
      params: {
        id,
      },
    });

    if (!response.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: response.data,
      },
    };
  }
};

const ViewContact: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div
      className='flex flex-col w-full h-screen min-h-screen'
      data-theme='winter'
    >
      <Head>
        <title>JobArchive</title>
        <meta
          name='description'
          content='JobArchive is a webtool which helps you to manage your company contacts'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Body>
        <View data={data}/>
      </Body>

      <Footer />
    </div>
  );
};

export default ViewContact;
