'use client'

import { loginSchema, LoginSchemaType } from '@/types/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import SubmitButton from '../ui/submit-button';

const LoginForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            name: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginSchemaType) => {
        console.log('Form submitted:', data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-4">
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl space-y-6"
                >
                    <div className="text-center border-b border-gray-200 pb-4 mb-4">
                        <div className="flex justify-center mb-2">
                            <span className="text-4xl">🚓</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-wide uppercase text-gray-800">
                            Kayin Traffic Log
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            သင့်အကောင့်ဖြင့် ဝင်ရောက်ပါ
                        </p>
                    </div>


                    <FormField
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="အသုံးပြုသူအမည်..."
                                        className="border-gray-300 focus:ring-2 focus:ring-green-400"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="password"
                                        {...field}
                                        placeholder="စကားဝှက်..."
                                        className="border-gray-300 focus:ring-2 focus:ring-green-400"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <SubmitButton text="၀င်မည်။" isPending={isPending} />
                </form>
            </FormProvider>
        </div>

    );
};

export default LoginForm;
