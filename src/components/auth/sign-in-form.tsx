'use client';
import React from "react";
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AgentLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Form submitted:", data);
    // TODO: Replace with API call
    await new Promise((res) => setTimeout(res, 1000));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-6xl">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-12">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-4xl font-bold mb-4">Agents Portal</h2>
                <p className="text-xl text-white/80 mb-6 leading-relaxed">
                  Welcome back to your travel management dashboard
                </p>
                <p className="text-white/60 text-sm max-w-md">
                  Please login here only if you have an agent account, otherwise close this page
                </p>

                <div className="mt-12 flex items-center space-x-8">
                  {[
                    {
                      label: "Secure",
                      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                    },
                    { label: "Fast", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                    {
                      label: "Reliable",
                      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={item.icon}
                          />
                        </svg>
                      </div>
                      <p className="text-xs text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center p-8 lg:p-12">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <div className="mb-6">
                    <img
                      className="h-16 w-16 mx-auto rounded-2xl shadow-lg"
                      src="../uploads/global/favicon.png"
                      alt="favicon"
                    />
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-slate-600">Sign in to your agent account</p>
                </div>

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
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/80 backdrop-blur-sm"
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
                        <input
                          {...field}
                          type="password"
                          id="password"
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/80 backdrop-blur-sm"
                        />
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
                              className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-slate-300 rounded"
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
                      className="text-sm font-medium text-violet-600 hover:text-violet-500"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>
                </form>

                <div className="lg:hidden mt-8 p-4 bg-violet-50 rounded-xl border border-violet-200">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-violet-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01..."
                      />
                    </svg>
                    <p className="text-sm text-violet-700">
                      Please login only if you have an agent account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
