"use client";
import Link from "next/link"

export default function RegisterComponent() {
    return (
        <div className="mx-auto max-w-md space-y-6 py-12">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome to Acme Inc</h1>
                <p className="text-gray-500 dark:text-gray-400">Create your account to start using our powerful platform.</p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="name">Name</label>
                    <input id="name" placeholder="Enter your name" required />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <input id="email" placeholder="Enter your email" required type="email" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password">Password</label>
                    <input id="password" placeholder="Enter your password" required type="password" />
                </div>
                <button className="w-full" type="submit">
                    Create Account
                </button>
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link className="font-medium underline underline-offset-4" href="#">
                    Sign in
                </Link>
            </div>
        </div>
    )
}
