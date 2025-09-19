"use client";

import React, { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { authClient } from "@lib/auth/client";
import { useRouter } from "next/navigation";
import { Alert } from "@components/core/alert";

// ✅ Zod schema for validation
const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgetPasswordForm() {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const onSubmit = useCallback(
    async (values: FormValues): Promise<void> => {
      setLoading(true);
      const { error } = await authClient.resetPassword(values);
      if (error) {
        setError('root', { type: 'server', message: error });
        setLoading(false);
        return;
      }
      setLoading(false);
      reset(); // clear form after success
      setShowSuccess(true); // show success alert

      // hide after 3s
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      router.refresh();
    },

    [router, setError]
  );

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Enhanced Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          RESET YOUR PASSWORD
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
          Forgot Password?
        </h1>
        <p className="text-gray-600 text-lg">
          No worries! Enter your email address and we'll send you a secure reset link.
        </p>
      </div>

      {/* Enhanced Form Container */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-100">

        {errors.root && (
          <div className="mb-6">
            <Alert variant='destructive'>{errors.root.message}</Alert>
          </div>
        )}
        {showSuccess && (
          <div className="mb-6">
            <Alert variant='success'>Password reset email sent successfully!</Alert>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Enhanced Email Field */}
          <div className="space-y-3">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Email Address
            </label>
            <div className="relative">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-orange-300"
                  />
                )}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="w-5 h-5 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm font-medium">{errors.email.message}</p>
            )}
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              We'll send you a secure reset link within minutes
            </p>
          </div>

          {/* Enhanced Submit Button */}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3.5 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center justify-center gap-2">
                {isSubmitting || loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Send Reset Link
                  </>
                )}
              </div>
            </button>

            {/* Enhanced Back to Login Button */}
            <Link
              href="/auth/sign-in"
              className="w-full bg-white/95 backdrop-blur-xl border-2 border-gray-200 text-gray-700 py-3.5 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Sign In
            </Link>
          </div>
        </form>

      </div>

      {/* Enhanced Security Notice */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Security & Privacy
            </p>
            <p className="text-sm text-blue-700 leading-relaxed">
              For your security, we'll send a secure reset link to your email. The link will expire in 24 hours for your protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
