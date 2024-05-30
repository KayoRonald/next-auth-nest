import type { ReactNode } from 'react'

export type LayoutProps = {
  children: ReactNode
}

export type ISignUpCredentials = {
  name: string
  username: string
  email: string
  password: string
}

export type ISignInCredentials = Pick<ISignUpCredentials, 'email' | 'password'>

export type IAuthContext = {
  signIn(credentials: ISignInCredentials): Promise<void>
  signUp(credentials: ISignUpCredentials): Promise<void>
  signOut(): void
}
