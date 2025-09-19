'use client';
import React, { useCallback, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useUser } from "@hooks/use-user";
import { authClient } from "@lib/auth/client";
import { useRouter } from "next/navigation";
import { Alert } from "@components/core/alert";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });
  const [loading, setLoading] = useState(false)
  const { checkSession } = useUser();
  const router = useRouter();
  //--------- on submit function
  const onSubmit = useCallback(
    async (values: LoginFormData): Promise<void> => {
      setLoading(true);
      const { error } = await authClient.signInWithPassword(values);
      if (error) {
        setError('root', { type: 'server', message: error });
        setLoading(false);
        return;
      }
      await checkSession?.();
      setLoading(false);
      //toast.success("Login successful!");
      router.refresh();
    },
    [router, setError]
  );

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Enhanced Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          WELCOME BACK
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
          Sign In
        </h1>
        <p className="text-gray-600 text-lg">
          New to Travel?{' '}
          <Link
            href={'/auth/signup'}
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>


      {
        errors.root && (
          <Alert variant="destructive">
            {errors.root.message}
          </Alert>
        )
      }

      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-3">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-300"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-3">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => {
                  const { value, ...rest } = field;
                  return (
                    <input
                      {...rest}
                      id="remember-me"
                      type="checkbox"
                      checked={!!value}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                    />
                  );
                }}
              />

              <label
                htmlFor="remember-me"
                className="ml-3 text-sm font-medium text-gray-600"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/auth/forget-password"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3.5 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing In...
              </div>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
