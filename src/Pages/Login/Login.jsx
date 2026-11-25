
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

import useAuth from '../../Hooks/useAuth';
import sideImage from '../../assets/sideImage.png';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const { signIn } = useAuth();
    const navigate = useNavigate();

    // Handle login
    const onSubmit = async (data) => {
        try {
            setLoginError('');

            // 1. Sign in using Firebase Authentication
            await signIn(
                data.email.trim(),
                data.password
            );

            // 2. Show success notification
            toast.success('Welcome back! Login successful.');

            // 3. Redirect user to Home page
            navigate('/', { replace: true });

        } catch (error) {
            console.error('Login Error:', error);

            // Handle Firebase authentication errors
            let errorMessage = 'Invalid email or password. Please try again.';

            if (
                error.code === 'auth/invalid-credential' ||
                error.code === 'auth/wrong-password' ||
                error.code === 'auth/user-not-found'
            ) {
                errorMessage = 'Incorrect email or password.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed attempts. Please try again later.';
            } else if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your internet connection.';
            }

            setLoginError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#f5f7fc] font-sans">

            {/* LEFT SIDE - IMAGE */}
            <div className="hidden md:block md:w-[54.5%] min-h-screen bg-[#080514] overflow-hidden">
                <img
                    src={sideImage}
                    alt="Students learning and sharing skills"
                    className="w-full h-screen object-cover object-center"
                />
            </div>

            {/* RIGHT SIDE - LOGIN FORM */}
            <div className="w-full md:w-[45.5%] min-h-screen flex items-center justify-center px-6 py-10 border-l-0 ">

                <div className="w-full max-w-[340px]">

                    {/* LOGO AND HEADING */}
                    <div className="text-center mb-8">

                        <h1 className="text-[30px] sm:text-[32px] font-black tracking-tighter text-[#075df5] leading-none">
                            LEARN<span>&</span>SHARE
                        </h1>

                        <h2 className="text-[15px] font-semibold text-[#20232b] mt-3">
                            Welcome Back!
                        </h2>

                        <p className="text-[9px] text-gray-500 mt-1">
                            Login to continue your learning journey.
                        </p>

                    </div>

                    {/* LOGIN FORM */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-3"
                    >

                        {/* LOGIN ERROR */}
                        {loginError && (
                            <div className="p-2.5 rounded-md bg-red-50 border border-red-200 text-red-600 text-[10px] text-center">
                                {loginError}
                            </div>
                        )}

                        {/* EMAIL FIELD */}
                        <div>

                            <label className="block text-[10px] font-medium text-[#454b57] mb-1">
                                E-mail
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your e-mail"
                                autoComplete="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: 'Please enter a valid email'
                                    }
                                })}
                                className="w-full h-[38px] px-3 rounded-md border border-[#dce1eb] bg-white text-[11px] text-gray-700 outline-none focus:border-[#0866ff] focus:ring-1 focus:ring-[#0866ff] transition"
                            />

                            {errors.email && (
                                <p className="text-red-500 text-[10px] mt-1">
                                    {errors.email.message}
                                </p>
                            )}

                        </div>

                        {/* PASSWORD FIELD */}
                        <div>

                            <div className="flex justify-between items-center mb-1">

                                <label className="block text-[10px] font-medium text-[#454b57]">
                                    Password
                                </label>

                                {/* <Link
                                    to="/forgot-password"
                                    className="text-[9px] text-[#075df5] hover:underline"
                                >
                                    Forgot Password?
                                </Link> */}

                            </div>

                            <div className="relative">

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })}
                                    className="w-full h-[38px] px-3 pr-10 rounded-md border border-[#dce1eb] bg-white text-[11px] text-gray-700 outline-none focus:border-[#0866ff] focus:ring-1 focus:ring-[#0866ff] transition"
                                />

                                {/* SHOW / HIDE PASSWORD */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0866ff] transition"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <EyeOff size={14} />
                                    ) : (
                                        <Eye size={14} />
                                    )}
                                </button>

                            </div>

                            {errors.password && (
                                <p className="text-red-500 text-[10px] mt-1">
                                    {errors.password.message}
                                </p>
                            )}

                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-[38px] mt-2 rounded-md bg-[#075df5] hover:bg-[#004ed6] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[11px] font-semibold transition-all duration-200 shadow-sm"
                        >
                            {isSubmitting ? 'Signing In...' : 'Login'}
                        </button>

                        {/* REGISTER LINK */}
                        <div className="text-center pt-4">

                            <p className="text-[10px] text-gray-500">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className="text-[#075df5] font-medium hover:underline"
                                >
                                    Create Account
                                </Link>
                            </p>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}
