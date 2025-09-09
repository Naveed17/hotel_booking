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
import { Alert } from "@components/ui/alert";

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
    <div className="w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl text-[#0F172B] mb-3">Sign in</h1>
        <p className="text-[#0F172B]/70">
          New user?{' '}
          <Link
            href={'/auth/signup'}
            className="text-[#163c8c] hover:text-[#163c8c]/80 transition-colors"
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
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
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-travel-blue-500 bg-white/80 backdrop-blur-sm"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-travel-blue-500 bg-white/80 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
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
                    className="h-4 w-4 text-travel-blue-600 focus:ring-travel-blue-500 border-slate-300 rounded"
                  />
                );
              }}
            />

            <label
              htmlFor="remember-me"
              className="ml-2 text-sm text-slate-600"
            >
              Remember me
            </label>
          </div>
          <a
            href="https://toptiertravel.site/agents/login-forget-password"
            className="text-sm font-medium text-travel-blue-600 hover:text-travel-blue-500"
          >
            Reset password
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full bg-gradient-to-r from-travel-blue-600 to-travel-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isSubmitting || loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
