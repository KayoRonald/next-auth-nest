import { createContext, ReactNode, useContext } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { setCookie, destroyCookie } from "nookies";
import { useToast } from "@chakra-ui/toast";
import api from "@/services/api";

interface IAuthProvider {
  children: ReactNode;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface signUpCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface IAuthContext {
  signIn(credentials: ISignInCredentials): Promise<void>;
  signUp(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: IAuthProvider) {
  const toast = useToast();
  const router = useRouter();

  const signIn = ({ email, password }: ISignInCredentials) => {
    console.log("Olá mundo!!!");
    console.log(email, password);
    const sessionUser = new Promise<void>(async (resolve, reject) => {
      try {
        const { data } = await api.post("auth/login", {
          email,
          password,
        });
       console.log(data.accessToken)
      //  const { token } = data
        setCookie(undefined, "backendtoken", data.accessToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });
        router.push("/");
        resolve();
      } catch (e) {
        const err = e as AxiosError;
        reject(err);
      }
    });
    return sessionUser;
  };

  const signUp = ({ name, username, email, password }: signUpCredentials) => {
    const sessionUser = new Promise<void>(async (resolve, reject) => {
      try {
        const sessionResponse = await api.post("user", {
          name,
          username,
          email,
          password,
        });
        router.push("/login");
        resolve();
      } catch (e) {
        const err = e as AxiosError;
        reject(err);
      }
    });
    return sessionUser;
  };
  const signOut = () => {
    destroyCookie(undefined, "backendtoken");
    router.push("/");
    toast({
      title: "Saindo...",
      status: "loading",
      duration: 100000,
    });
    router.reload();
  };
  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
