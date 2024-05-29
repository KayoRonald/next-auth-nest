import Head from 'next/head'
import { Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';


export default function Signup() {
  return (
    <>
      <Head>
        <title>signup Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text>signup</Text>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  if (cookies['backendtoken']) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};