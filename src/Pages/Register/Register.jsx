
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { sendEmailVerification } from 'firebase/auth';

import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import sideImage from '../../assets/sideImage.png';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const { createUser, updateUserProfile } = useAuth();
    const api = useAxios();

    const location = useLocation();
    const navigate = useNavigate();

    const returnTo = location.state?.from || '/';

    // Handle registration
    const onSubmit = async (data) => {
        try {
            // 1. Create user in Firebase Authentication
            const result = await createUser(
                data.email.trim(),
                data.password
            );

            // 2. Generate display name from email
            const displayName = data.email
                .split('@')[0]
                .replace(/[._-]/g, ' ');

            // 3. Update Firebase user profile
            await updateUserProfile({
                displayName
            });

            // 4. Send Firebase email verification
            await sendEmailVerification(result.user);

            // 5. Prepare user information for MongoDB
            const userRecord = {
                name: displayName,
                email: result.user.email,
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString()
            };

            // 6. Save user information in MongoDB
            const response = await api.post('/users', userRecord);

            // 7. Check backend response
            if (
                response.status === 200 ||
                response.status === 201
            ) {
                // 8. Show success notification
                toast.success(
                    'Registration successful! Please verify your email.'
                );

                // 9. Navigate after successful registration
                navigate(returnTo, { replace: true });
            }

        } catch (error) {
            console.error('Registration Error:', error);

            // Handle Firebase errors
            const errorCode = error.code;

            let errorMessage = 'Registration failed. Please try again.';

            if (errorCode === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered.';
            } else if (errorCode === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            } else if (errorCode === 'auth/weak-password') {
                errorMessage = 'Your password is too weak.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

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

            {/* RIGHT SIDE - REGISTRATION FORM */}
            <div className="w-full md:w-[45.5%] min-h-screen flex items-center justify-center px-6 py-10 border-l-0 ">

                <div className="w-full max-w-[340px]">

                    {/* LOGO AND HEADING */}
                    <div className="text-center mb-8">

                        <h1 className="text-[30px] sm:text-[32px] font-black tracking-tighter text-[#075df5] leading-none">
                            LEARN<span>&</span>SHARE
                        </h1>

                        <h2 className="text-[15px] font-semibold text-[#20232b] mt-3">
                            Create your account
                        </h2>

                        <p className="text-[9px] text-gray-500 mt-1">
                            We'll send a verification link to confirm it's you.
                        </p>

                    </div>

                    {/* REGISTRATION FORM */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-3"
                    >

                        {/* EMAIL FIELD */}
                        <div>

                            <label className="block text-[10px] font-medium text-[#454b57] mb-1">
                                E-mail
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your e-mail"
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

                            <label className="block text-[10px] font-medium text-[#454b57] mb-1">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
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

                        {/* PRIVACY POLICY CHECKBOX */}
                        <div className="flex items-start gap-2 pt-1">

                            <input
                                type="checkbox"
                                id="privacy"
                                {...register('privacy', {
                                    required: 'You must agree to the Privacy Policy'
                                })}
                                className="mt-[2px] w-[11px] h-[11px] accent-[#0866ff] cursor-pointer"
                            />

                            <label
                                htmlFor="privacy"
                                className="text-[9px] text-[#555d6b] leading-relaxed cursor-pointer"
                            >
                                By creating an account, you agree to our{' '}
                                <Link
                                    to="/privacy"
                                    className="text-[#0866ff] underline"
                                >
                                    Privacy Policy
                                </Link>.
                            </label>

                        </div>

                        {errors.privacy && (
                            <p className="text-red-500 text-[10px]">
                                {errors.privacy.message}
                            </p>
                        )}

                        {/* NEXT BUTTON */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-[38px] mt-1 rounded-md bg-[#075df5] hover:bg-[#004ed6] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[11px] font-semibold transition-all duration-200 shadow-sm"
                        >
                            {isSubmitting
                                ? 'Creating Account...'
                                : 'Next'}
                        </button>

                        {/* LOGIN LINK */}
                        <div className="text-center pt-4">

                            <p className="text-[10px] text-gray-500">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-[#075df5] font-medium hover:underline"
                                >
                                    Login
                                </Link>
                            </p>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}
