'use server';

import { loginUser, registerUser } from '@/lib/services/auth.service';
import { LoginData, SignUpData } from '@/types/auth';

export async function signUpAction(data: SignUpData) {
    return await registerUser(data);
}

export async function loginAction(data: LoginData) {
    return await loginUser(data);
}
