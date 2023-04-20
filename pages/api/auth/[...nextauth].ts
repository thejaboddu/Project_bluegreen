import axios from 'axios'
import NextAuth, { Session, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// import * as dotenv from 'dotenv'

// dotenv.config()

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/admin/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials
        const user = await axios
          .post(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login`, {
            email,
            password,
          })
          .then(({ data }) => {
            return data
          })
          .catch((error: any) => {
            throw new Error(
              error.response
                ? `${error.response.data.message}`
                : `${error.message}`
            )
          })
        return user
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  callbacks: {
    // async redirect({ baseUrl }) {
    //   return `${baseUrl}/admin`
    // },
    async jwt({ token, user} ) {      
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if(user){
        return {
          ...token,
          user,
        }
      }
      return token
    },
    async session({ session, token }) {
      return { ...session, user: token.user as Session['user'] }
    },
  },
}

export default NextAuth(authOptions)
