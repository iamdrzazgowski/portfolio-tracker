'use server';

import { auth } from '@/lib/auth';

export interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export async function signUpAction(data: SignUpData) {
    const { name, email, password, confirmPassword } = data;

    if (!name || !email || !password || !confirmPassword) {
        throw new Error('Name, email and password are required!');
    }

    if (password !== confirmPassword) {
        throw new Error('Password and confirm password must be the same');
    }

    const res = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        },
    });

    if (!res.token) {
        throw new Error('Problem with register user');
    }

    return { success: true };
}

export async function loginAction(data: LoginData) {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const res = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
    });

    if (!res.token) {
        throw new Error('Login error. Email or password are invalid');
    }

    return { succes: true };
}
