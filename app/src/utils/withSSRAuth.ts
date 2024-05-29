import {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
} from 'next';
import { parseCookies } from 'nookies';
import api from '../services/api';

const withSSRAuth = <T extends { [key: string]: any }>(
  fn: GetServerSideProps<T>
) => {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx);
    // se não possui o cookie com o token
    if (!cookies['backendtoken']) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    // passar token para o Authorization header através dos cookies
    api.defaults.headers[
      'Authorization'
    ] = `Bearer ${cookies['backendtoken']}`;

    return await fn(ctx);
  };
};

export default withSSRAuth;