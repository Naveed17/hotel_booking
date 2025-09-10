"use client";

import React, { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { authClient } from "@lib/auth/client";
import { useRouter } from "next/navigation";
import { Alert } from "@components/ui/alert";

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
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl text-[#0F172B] mb-3">
            Reset Password
          </h1>
          <p className="text-[#0F172B]/70">
            Enter your email address and we'll send you a new password
          </p>
        </div>

        {errors.root && (
          <Alert className="mb-4" variant='destructive'>{errors.root.message}</Alert>
        )}
        {showSuccess && (
          <Alert className="mb-4" variant='success'>Password reset email sent!</Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field with Controller */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
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
                    className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-travel-blue-500 focus:border-travel-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                )}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="w-5 h-5 text-slate-400"
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
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              We'll email you a new password within minutes
            </p>
          </div>

          {/* Submit Button */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="login_button w-full bg-gradient-to-r from-travel-blue-600 to-travel-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 btn-hover focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
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
                {isSubmitting || loading ? "Sending..." : "Send New Password"}
              </div>
            </button>

            {/* Back to Login Button */}
            <Link
              href="/auth/sign-in"
              className="backlogin w-full bg-white border-2 border-slate-300 text-slate-700 py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:border-slate-400 transition-all duration-300 btn-hover-secondary focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Back to Login
            </Link>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0"
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
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                Security Notice
              </p>
              <p className="text-xs text-blue-700">
                For your security, the new password will be automatically
                generated and sent to your email address.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
