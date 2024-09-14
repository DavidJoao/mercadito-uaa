"use server"

import { signIn, signOut, auth } from "../auth";
import { AuthError } from "next-auth";

export async function logSession () {
    const session = await auth();
    return session
}

export async function logoutUser () {
    await signOut({ redirect: true, redirectTo: '/login' });
    const session = await auth();
    return session
}

export async function authenticate (formData) {
    try {
        await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: true,
            redirectTo: '/home'
        })
    } catch (error) {
        if (error) {
            switch (error.type) {
                case 'CredentialsSignin' :
                    return 'Invalid Credentials';
                default: 
                    return 'Something Went Wrong'
            }
        }
        throw error;
    }
}




