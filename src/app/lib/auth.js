import { db } from "./db";
import { PrismaAdapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import NextAuth from 'next-auth'

const authOptions = { 
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: { 
                email: { label: "Email", type: "email", placeholder: "ejemplo@gmail.com" },
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null
                }

                // const existingUser = await db.findUser     FINISH AFTER CONNECTING MONGO
                // if (!existingUser) return null

                // const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password)
                // if (!passwordMatch) return null

                return {
                    // user: existingUser
                }

            }
        })
    ],
    
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const { password, ...userWithoutPassword } = user.user
                return { 
                    ...token,
                    user: userWithoutPassword
                }
            }
            return token
        },
        async session({ session, token }) {
            return { 
                ...session,
                user: token.user
            }
        }
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)