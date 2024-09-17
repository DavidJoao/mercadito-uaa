import { db } from "./db";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
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
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
    
                if(!credentials?.email || !credentials?.password) {
                    return null
                }
    
                const existingUser = await db.user.findUnique({ where: { email: credentials.email } })
    
                if (!existingUser) return null;
    
                const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password)
    
                if (!passwordMatch) return null

                const { password, ...userWithoutPassword } = existingUser;
                return JSON.parse(JSON.stringify(userWithoutPassword));
            }
            })
        ],
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    // Return a plain, serializable user object
                    return {
                        ...token,
                        user: JSON.parse(JSON.stringify(user)),  // Ensure the user object is serializable
                    };
                }
                return token;
            },
            
            async session({ session, token }) {
                // Pass a plain user object to the session
                return {
                    ...session,
                    user: token.user,  // Ensure this user object is plain
                };
            }
        }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)