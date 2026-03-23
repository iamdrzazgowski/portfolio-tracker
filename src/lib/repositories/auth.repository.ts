import { auth } from '@/lib/auth';

export const authRepository = {
    async signUp(data: { name: string; email: string; password: string }) {
        return await auth.api.signUpEmail({
            body: data,
        });
    },

    async signIn(data: { email: string; password: string }) {
        return await auth.api.signInEmail({
            body: data,
        });
    },
};
