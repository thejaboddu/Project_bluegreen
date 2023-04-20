import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    firstName: string
    lastName: string
    email: string
    token: string
    // isEmailVerify: boolean
  }

  interface Session {
    user: User & DefaultSession['user']
  }
}
