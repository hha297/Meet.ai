'use client';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { OctagonAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const formSchema = z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(1, { message: 'Password is required' }),
});

export const SignInView = () => {
        const router = useRouter();
        const [error, setError] = useState<string | null>(null);
        const [pending, setPending] = useState(false);
        const form = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues: {
                        email: '',
                        password: '',
                },
        });

        const onSubmit = (data: z.infer<typeof formSchema>) => {
                setError(null);
                setPending(true);

                authClient.signIn.email(
                        {
                                email: data.email,
                                password: data.password,
                                callbackURL: '/',
                        },
                        {
                                onSuccess: () => {
                                        setPending(false);
                                        router.push('/');
                                },
                                onError: ({ error }) => {
                                        setPending(false);
                                        setError(error.message || 'An error occurred during sign in');
                                },
                        },
                );
        };

        const onSocialSignIn = (provider: 'google' | 'github') => {
                setError(null);
                setPending(true);

                authClient.signIn.social(
                        {
                                provider: provider,
                                callbackURL: '/',
                        },
                        {
                                onSuccess: () => {
                                        toast.success('Successfully signed in with ' + provider);
                                        setPending(false);
                                },
                                onError: ({ error }) => {
                                        setPending(false);
                                        toast.error('An error occurred during sign in with ' + provider);
                                        setError(error.message || 'An error occurred during sign in');
                                },
                        },
                );
        };
        return (
                <div className="flex flex-col gap-6">
                        <Card className="overflow-hidden p-0">
                                <CardContent className="grid p-0 md:grid-cols-2">
                                        <Form {...form}>
                                                <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                                                        <div className="flex flex-col gap-6">
                                                                <div className="flex flex-col items-center text-center">
                                                                        <h1 className="text-2xl font-bold">
                                                                                Welcome Back!
                                                                        </h1>
                                                                        <p className="text-muted-foreground text-balance">
                                                                                Sign in to your account
                                                                        </p>
                                                                </div>
                                                                <div className="grid gap-3">
                                                                        <FormField
                                                                                control={form.control}
                                                                                name="email"
                                                                                render={({ field }) => (
                                                                                        <FormItem>
                                                                                                <FormLabel>
                                                                                                        Email
                                                                                                </FormLabel>
                                                                                                <FormControl>
                                                                                                        <Input
                                                                                                                type="email"
                                                                                                                placeholder="example@me.com"
                                                                                                                {...field}
                                                                                                                className="w-full p-2 border rounded"
                                                                                                        />
                                                                                                </FormControl>
                                                                                                <FormMessage />
                                                                                        </FormItem>
                                                                                )}
                                                                        />
                                                                        <FormField
                                                                                control={form.control}
                                                                                name="password"
                                                                                render={({ field }) => (
                                                                                        <FormItem>
                                                                                                <FormLabel>
                                                                                                        Password
                                                                                                </FormLabel>
                                                                                                <FormControl>
                                                                                                        <Input
                                                                                                                type="password"
                                                                                                                placeholder="********"
                                                                                                                {...field}
                                                                                                                className="w-full p-2 border rounded"
                                                                                                        />
                                                                                                </FormControl>
                                                                                                <FormMessage />
                                                                                        </FormItem>
                                                                                )}
                                                                        />
                                                                </div>
                                                                {!!error && (
                                                                        <Alert className="bg-destructive/10 border-none">
                                                                                <OctagonAlertIcon className="h-4 w-4 mr-2 !text-destructive" />
                                                                                <AlertTitle>Error</AlertTitle>
                                                                        </Alert>
                                                                )}
                                                                <Button
                                                                        disabled={pending}
                                                                        type="submit"
                                                                        className="w-full"
                                                                >
                                                                        Sign In
                                                                </Button>
                                                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after: z-0 after:flex after:items-center after:border-t">
                                                                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                                                                                Or continue with
                                                                        </span>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                        <Button
                                                                                disabled={pending}
                                                                                variant="outline"
                                                                                type="button"
                                                                                className="w-full cursor-pointer"
                                                                                onClick={() => onSocialSignIn('google')}
                                                                        >
                                                                                <FaGoogle />
                                                                                Google
                                                                        </Button>
                                                                        <Button
                                                                                disabled={pending}
                                                                                variant="outline"
                                                                                type="button"
                                                                                className="w-full cursor-pointer"
                                                                                onClick={() => {
                                                                                        onSocialSignIn('github');
                                                                                }}
                                                                        >
                                                                                <FaGithub />
                                                                                GitHub
                                                                        </Button>
                                                                </div>
                                                                <div className="text-center text-sm">
                                                                        Don&apos;t have an account?{' '}
                                                                        <Link
                                                                                href="/sign-up"
                                                                                className="underline-offset-4 hover:underline text-green-600"
                                                                        >
                                                                                Sign Up
                                                                        </Link>
                                                                </div>
                                                        </div>
                                                </form>
                                        </Form>

                                        <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                                                <Image
                                                        src="/logo.svg"
                                                        alt="logo"
                                                        width={96}
                                                        height={96}
                                                        className="h-24 w-24"
                                                />
                                                <p className="text-2xl font-semibold text-white">Meet.AI</p>
                                        </div>
                                </CardContent>
                        </Card>

                        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:hover:underline *:[a]:underline-offset-4">
                                By signing in, you agree to our{' '}
                                <a href="/terms" className="underline">
                                        Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="/privacy" className="underline">
                                        Privacy Policy
                                </a>
                                .
                        </div>
                </div>
        );
};
