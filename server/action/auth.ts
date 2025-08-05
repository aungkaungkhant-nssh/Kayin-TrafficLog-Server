/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { signIn, signOut } from "@/auth";

export async function login(data: any) {
    try {
        const res = await signIn("credentials", { ...data, redirect: false }); // Or other provider
        return res;
    } catch (err: any) {
        return {
            error: err.type
        }
    }

}

export async function logout() {
    return await signOut(); // Or other provider
}