import { LoginData, SignUpData } from '@/types/auth';
import { authRepository } from '../repositories/auth.repository';

export async function registerUser(data: SignUpData) {
    const { name, email, password, confirmPassword } = data;

    if (!name || !email || !password || !confirmPassword) {
        throw new Error('Name, email and password are required!');
    }

    if (password !== confirmPassword) {
        throw new Error('Password and confirm password must be the same');
    }

    const res = await authRepository.signUp({ name, email, password });

    if (!res.token) {
        throw new Error('Problem with register user');
    }

    return { success: true };
}

export async function loginUser(data: LoginData) {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const res = await authRepository.signIn({ email, password });

    if (!res.token) {
        throw new Error('Login error. Email or password are invalid');
    }

    return { success: true };
}
