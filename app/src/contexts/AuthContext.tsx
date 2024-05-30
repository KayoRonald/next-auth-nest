import { createContext, ReactNode, useContext } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { setCookie, destroyCookie } from "nookies";
import { useToast } from "@chakra-ui/toast";
import api from "@/services/api";
import { IAuthContext, ISignInCredentials, ISignUpCredentials, LayoutProps } from "@/types";

export const AuthContext = createContext({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: LayoutProps) {
  const toast = useToast();
  const router = useRouter();
  const signIn = ({ email, password }: ISignInCredentials) => {
    const sessionUser = new Promise<void>(async (resolve, reject) => {
      try {
        const { data } = await api.post("auth/login", {
          email,
          password,
        });
        setCookie(undefined, "backendtoken", data.accessToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });
        toast({
          title: 'Login feito com sucesso',
          description: `Você está autenticado como "${email}"`,
          status: 'success',
          duration: 5000,
          isClosable: true
        })
        router.push("/");
        resolve();
      } catch (e) {
        const err = e as AxiosError;
        reject(err);
      }
    });
    return sessionUser;
  };

  const signUp = ({ name, username, email, password }: ISignUpCredentials) => {
    const sessionUser = new Promise<void>(async (resolve, reject) => {
      try {
        await api.post("user", {
          name,
          username,
          email,
          password,
        });
        toast({
          title: "Cadastro feito com sucesso",
          description: "Redirecionado para login",
          status: "success",
          duration: 5000,
          isClosable: true,
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
